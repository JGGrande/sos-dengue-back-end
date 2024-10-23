import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class RecoverUserPasswordDto {
  @IsEmail({}, { message: 'O e-mail fornecido é inválido.' })
  @MaxLength(255, { message: 'O e-mail deve ter no máximo 255 caracteres.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;
}