import { IsJWT, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class ChangeUserPasswordDto {
  @IsString({ message: 'O token deve ser uma string' })
  @IsNotEmpty({ message: 'O token não pode estar vazio' })
  @IsJWT({ message: 'O token deve ser um JWT válido' })
  token: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minSymbols: 1,
  }, { message: 'A senha deve ter pelo menos 6 caracteres, incluindo 1 letra minúscula e 1 carácter especial' })
  @MaxLength(255, { message: 'Senha digitada maior que o tamanho suportado' })
  password: string
}