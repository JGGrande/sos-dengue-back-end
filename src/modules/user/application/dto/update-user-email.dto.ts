import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class UpdateUserEmailDto {
  @IsEmail()
  @MaxLength(255)
  @IsNotEmpty()
  newEmail: string;
}