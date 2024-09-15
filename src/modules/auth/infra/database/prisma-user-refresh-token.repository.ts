import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { IUserRefreshTokenRepository } from "../../domain/repositories/user-refresh-token.repository";
import { SaveUserRefreshTokenDto } from "../../application/dtos/save-user-refresh-token.dto";
import { UserRefreshToken } from "../../domain/entities/user-refresh-token.entity";

@Injectable()
export class PrismaUserRefreshTokenRepository implements IUserRefreshTokenRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  public async save({ userId, expiresIn, token }: SaveUserRefreshTokenDto): Promise<UserRefreshToken> {
    const refreshTokenData = await this.prisma.userRefreshToken.upsert({
      create: {
        userId,
        expiresIn,
        token
      },
      update: {
        expiresIn,
        token
      },
      where: {
        userId
      }
    });

    const refreshToken = new UserRefreshToken(refreshTokenData);

    return refreshToken;
  }

  public async findByUserId(userId: number): Promise<UserRefreshToken | null> {
    const refreshTokenData = await this.prisma.userRefreshToken.findFirst({
      where: {
        userId
      }
    });

    if (!refreshTokenData) {
      return null;
    }

    const refreshToken = new UserRefreshToken(refreshTokenData);

    return refreshToken;
  }

}