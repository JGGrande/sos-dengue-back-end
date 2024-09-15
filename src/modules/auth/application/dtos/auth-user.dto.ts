import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength } from "class-validator";

export class AuthUserDto {
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