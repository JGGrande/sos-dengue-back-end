import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class UpdateUserEmailDto {
  @IsEmail({}, { message: 'O e-mail fornecido não é válido.' })
  @MaxLength(255, { message: 'O e-mail deve ter no máximo 255 caracteres.' })
  @IsNotEmpty({ message: 'O campo e-mail não pode estar vazio.' })
  newEmail: string;
}