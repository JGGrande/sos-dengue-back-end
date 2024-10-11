import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { IsValidCPF } from "src/shared/decorators/is-valid-cpf.decorator";

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @IsValidCPF()
  cpf: string;

  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minSymbols: 1,
  })
  @MaxLength(255)
  password: string;
}


export class CreateUserByRequestDto extends CreateUserDto {}

