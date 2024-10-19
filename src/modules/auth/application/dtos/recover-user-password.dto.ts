import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class RecoverUserPasswordDto {
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  email: string;
}