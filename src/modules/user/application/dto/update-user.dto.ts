import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { IsValidCPF } from "src/shared/decorators/is-valid-cpf.decorator";
import { Role } from "../../domain/entities/user-roles.enum";

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(255, { message: 'Nome deve ter no máximo 255 caracteres' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string' })
  @MinLength(11, { message: 'CPF deve ter exatamente 11 caracteres' })
  @MaxLength(11, { message: 'CPF deve ter exatamente 11 caracteres' })
  @IsValidCPF({ message: 'CPF inválido' })
  cpf: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  @MaxLength(255, { message: 'Email deve ter no máximo 255 caracteres' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minSymbols: 1,
  }, { message: 'Senha deve ter no mínimo 6 caracteres, incluindo 1 letra minúscula e 1 símbolo' })
  @MaxLength(255, { message: 'Senha deve ter no máximo 255 caracteres' })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: string;
}
