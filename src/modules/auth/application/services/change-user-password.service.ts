import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserRepository, UserRepositoryToken } from "src/modules/user/domain/repositories/user.repository";
import { HashProvider, HashProviderToken } from "src/shared/providers/interface/hash.provider";

type Payload = {
  id: number;
}

@Injectable()
export class ChangeUserPasswordService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly jwtProvider: JwtService,
    private readonly configService: ConfigService,
    @Inject(HashProviderToken)
    private readonly hashProvider: HashProvider,
  ){ }

  async execute(password: string, token: string): Promise<void> {
    let payload: Payload = null;

    try{
      const EMAIL_TOKEN_SECRET = this.configService.get<string>("VERIFY_EMAIL_TOKEN_SECRET");

      payload = this.jwtProvider.verify(token, {
        secret: EMAIL_TOKEN_SECRET
      });

    } catch (error) {
      throw new UnauthorizedException("Token invalido");
    }

    const { id } = payload;

    const salt = this.configService.get<number>("PASSWORD_SALT");

    const passwordHashed = await this.hashProvider.hash(password, salt);

    await this.userRepository.updatePassword(id, passwordHashed);
  }
}