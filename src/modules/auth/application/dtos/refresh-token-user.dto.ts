import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenUserDto {
  @IsString({ message: 'O token de atualização deve ser uma string' })
  @IsNotEmpty({ message: 'O token de atualização não pode estar vazio' })
  refreshToken: string;
}