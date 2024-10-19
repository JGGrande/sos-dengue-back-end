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
  @IsString()
  @IsValidCPF()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minSymbols: 1,
  })
  @MaxLength(255)
  password: string;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => DeviceInfoDto)
  deviceInfo: DeviceInfoDto;
}