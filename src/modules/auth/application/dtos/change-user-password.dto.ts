import { IsJWT, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class ChangeUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minSymbols: 1,
  })
  @MaxLength(255)
  password: string
}