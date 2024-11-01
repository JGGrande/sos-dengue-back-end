import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository, UserRepositoryToken } from "src/modules/user/domain/repositories/user.repository";
import { HashProvider, HashProviderToken } from "src/shared/providers/interface/hash.provider";
import { IUserRefreshTokenRepository, UserRefreshTokenRepositoryToken } from "../../domain/repositories/user-refresh-token.repository";
import { DateProviderToken, IDateProvider } from "src/shared/providers/interface/date.provider";
import { ConfigService } from "@nestjs/config";
import { QueueService } from "src/shared/queue/queue.service";

type Request = {
  cpf: string;
  password: string;
  deviceInfo: {
    osName: string;
    osVersion: string;
    modelName: string;
    androidId: string;
  }
}

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(UserRefreshTokenRepositoryToken)
    private readonly userRefreshTokenRepository: IUserRefreshTokenRepository,
    private readonly queueService: QueueService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(HashProviderToken)
    private readonly hashProvider: HashProvider,
    @Inject(DateProviderToken)
    private readonly dateProvider: IDateProvider,
  ){ }

  async execute({ cpf, password, deviceInfo }: Request){
    const user = await this.userRepository.findByCpf(cpf);

    if(!user){
      throw new NotFoundException("CPF ou senha inválidos.");
    }

    const passwordMatch = await this.hashProvider.compare(password, user.password);

    if(!passwordMatch){
      throw new NotFoundException("CPF ou senha inválidos.");
    }

    const tokenPayload = {
      id: user.id,
      role: user.role
    };

    const token = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>("AUTH_TOKEN_SECRET"),
      expiresIn: this.configService.getOrThrow<string>("AUTH_TOKEN_EXPIRES_IN")
    });

    const REFRESH_TOKEN_SECRET = this.configService.get<string>("REFRESH_TOKEN_SECRET");
    const REFRESH_TOKEN_EXPIRES_IN = this.configService.get<string>("REFRESH_TOKEN_EXPIRES_IN");

    const { dateNowPlusDays } = this.dateProvider;

    const refreshToken = this.jwtService.sign(
      tokenPayload,
      {
        secret: REFRESH_TOKEN_SECRET,
        expiresIn: REFRESH_TOKEN_EXPIRES_IN
      }
    );

    const refreshTokenExpiresInOnNumberFormat = +REFRESH_TOKEN_EXPIRES_IN.replace('d','');
    const expiresIn = dateNowPlusDays(refreshTokenExpiresInOnNumberFormat);

    await this.userRefreshTokenRepository.save({
      userId: user.id,
      token: refreshToken,
      expiresIn
    });

    const ocurredAt = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'America/Sao_Paulo',
    }).format(new Date());

    await this.queueService.addEmailJob({
      to: user.email,
      subject: "Login",
      context: {
        name: user.name,
        ocurredAt: ocurredAt,
        deviceInfo: deviceInfo
      },
      template: "notify-login.template.hbs",
    });

    return { user, token, refreshToken };
  }
}