import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenUserDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}