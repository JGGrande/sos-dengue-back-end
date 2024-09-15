import { SaveUserRefreshTokenDto } from "../../application/dtos/save-user-refresh-token.dto";
import { UserRefreshToken } from "../entities/user-refresh-token.entity";

export interface IUserRefreshTokenRepository {
  save({ }: SaveUserRefreshTokenDto): Promise<UserRefreshToken>;
  findByUserIdAndToken(userId: number, token: string): Promise<UserRefreshToken | null>;
}

export const UserRefreshTokenRepositoryToken = Symbol('UserRefreshTokenRepository');