import { Inject, UnauthorizedException } from "@nestjs/common";
import { IUserRefreshTokenRepository, UserRefreshTokenRepositoryToken } from "../../domain/repositories/user-refresh-token.repository";
import { JwtService } from "@nestjs/jwt";
import { Env } from "src/shared/config/config.module";
import { DateProviderToken, IDateProvider } from "src/shared/providers/interface/date.provider";

type Request = {
  refreshToken: string;
}

export class RefreshTokenUserService {
  constructor(
    @Inject(UserRefreshTokenRepositoryToken)
    private readonly userRefreshTokenRepository: IUserRefreshTokenRepository,
    @Inject(DateProviderToken)
    private readonly dateProvider: IDateProvider,
    private readonly jwtService: JwtService
  ) { }

  async execute({ refreshToken }: Request) {
    const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES_IN } = process.env as Env;

    const { dateNowPlusDays, hasExpired } = this.dateProvider;

    let decoded: unknown;

    try {
      decoded = this.jwtService.verify(refreshToken, {
        secret: REFRESH_TOKEN_SECRET,
        ignoreExpiration: true
      });
    } catch {}

    if (!decoded) {
      throw new UnauthorizedException("Token inválido!");
    }

    const { id: userId } = decoded as { id: number };

    const userRefreshToken = await this.userRefreshTokenRepository.findByUserIdAndToken(userId, refreshToken);

    if (!userRefreshToken) {
      throw new UnauthorizedException("Token inválido");
    }

    const tokenPayload = { id: userId };

    const token = this.jwtService.sign(tokenPayload);

    const refreshTokenHasExpired = hasExpired(userRefreshToken.expiresIn);

    let newRefreshToken: string | null = null;

    if(refreshTokenHasExpired){
      newRefreshToken = this.jwtService.sign(
        tokenPayload,
        {
          secret: REFRESH_TOKEN_SECRET,
          expiresIn: REFRESH_TOKEN_EXPIRES_IN
        }
      );

      const expiresIn = dateNowPlusDays(+REFRESH_TOKEN_EXPIRES_IN.replace('d',''));

      await this.userRefreshTokenRepository.save({
        userId,
        token: newRefreshToken,
        expiresIn
      });
    }

    return {
      token,
      newRefreshToken
    };
  }
}