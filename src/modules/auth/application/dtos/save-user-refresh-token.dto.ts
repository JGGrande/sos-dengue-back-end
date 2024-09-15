export class SaveUserRefreshTokenDto {
  userId: number;
  token: string;
  expiresIn: Date;
}