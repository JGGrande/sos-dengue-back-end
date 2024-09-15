import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository, UserRepositoryToken } from "src/modules/user/domain/repositories/user.repository";
import { HashProvider, HashProviderToken } from "src/shared/providers/interface/hash.provider";
import { IUserRefreshTokenRepository, UserRefreshTokenRepositoryToken } from "../../domain/repositories/user-refresh-token.repository";
import { Env } from "src/shared/config/config.module";
import { DateProviderToken, IDateProvider } from "src/shared/providers/interface/date.provider";

type Request = {
  email: string;
  password: string;
}

@Injectable()
export class AuthUserService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject(UserRefreshTokenRepositoryToken)
    private readonly userRefreshTokenRepository: IUserRefreshTokenRepository,
    private readonly emailProvider: MailerService,
    private readonly jwtService: JwtService,
    @Inject(HashProviderToken)
    private readonly hashProvider: HashProvider,
    @Inject(DateProviderToken)
    private readonly dateProvider: IDateProvider,
  ){ }

  async execute({ email, password }: Request){
    const user = await this.userRepository.findByEmail(email);

    if(!user){
      throw new BadRequestException("Usuário ou senha inválidos!");
    }

    const passwordMatch = await this.hashProvider.compare(password, user.password);

    if(!passwordMatch){
      throw new BadRequestException("Usuário ou senha inválidos!");
    }

    const tokenPayload = { id: user.id };

    const token = this.jwtService.sign(tokenPayload);

    const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = process.env as Env;

    const { dateNowPlusDays } = this.dateProvider;

    const refreshToken = this.jwtService.sign(
      tokenPayload,
      {
        secret: REFRESH_TOKEN_SECRET,
        expiresIn: REFRESH_TOKEN_EXPIRES_IN
      }
    );

    const expiresIn = dateNowPlusDays(+REFRESH_TOKEN_EXPIRES_IN.replace('d',''));

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

    await this.emailProvider.sendMail({
      to: email,
      subject: "Login",
      context: {
        name: user.name,
        ocurredAt: ocurredAt
      },
      template: "notify-login.template.hbs",
    });

    return { user, token, refreshToken };
  }
}