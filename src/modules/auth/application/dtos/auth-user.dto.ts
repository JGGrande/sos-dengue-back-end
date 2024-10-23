import { Type } from "class-transformer";
import { IsNotEmptyObject, IsObject, IsString, IsStrongPassword, MaxLength, MinLength, ValidateNested } from "class-validator";
import { IsValidCPF } from "src/shared/decorators/is-valid-cpf.decorator";

class DeviceInfoDto {
  @IsString()
  osName: string;

  @IsString()
  osVersion: string;

  @IsString()
  modelName: string;

  @IsString()
  androidId: string;
}

export class AuthUserDto {
  @IsString({ message: "CPF deve ser uma string" })
  @IsValidCPF({ message: "CPF inválido" })
  @MinLength(11, { message: "CPF deve ter exatamente 11 caracteres", })
  @MaxLength(11, { message: "CPF deve ter exatamente 11 caracteres" })
  cpf: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minSymbols: 1,
  }, { message: "Senha deve ter no mínimo 6 caracteres, incluindo pelo menos 1 letra minúscula e 1 carácter especial" })
  @MaxLength(255, { message: "Senha digitada maior que o tamanho suportado" })
  password: string;

  @IsObject({ message: "Informações do dispositivo devem ser um objeto" })
  @IsNotEmptyObject({}, { message: "Informações do dispositivo não podem estar vazias" })
  @ValidateNested({ message: "Informações do dispositivo são inválidas" })
  @Type(() => DeviceInfoDto)
  deviceInfo: DeviceInfoDto;
}