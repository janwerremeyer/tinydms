import { IsEmail, Length } from "class-validator";

export class RegisterUserRequestDto {
  @Length(1, 255)
  @IsEmail()
  email: string;

  @Length(1, 255)
  password: string

}