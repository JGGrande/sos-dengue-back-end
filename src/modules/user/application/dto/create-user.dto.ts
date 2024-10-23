import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { IsValidCPF } from "src/shared/decorators/is-valid-cpf.decorator";

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString({ message: 'CPF deve ser uma string' })
  @MinLength(11, { message: 'CPF deve ter exatamente 11 caracteres' })
  @MaxLength(11, { message: 'CPF deve ter exatamente 11 caracteres' })
  @IsValidCPF({ message: 'CPF inválido' })
  cpf: string;

  @IsEmail({}, { message: 'Email inválido' })
  @MaxLength(255, { message: 'Email deve ter no máximo 255 caracteres' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minSymbols: 1,
  }, { message: 'Senha deve ter no mínimo 6 caracteres, incluindo 1 letra minúscula e 1 símbolo' })
  @MaxLength(255, { message: 'Senha deve ter no máximo 255 caracteres' })
  password: string;
}


export class CreateUserByRequestDto extends CreateUserDto {}

