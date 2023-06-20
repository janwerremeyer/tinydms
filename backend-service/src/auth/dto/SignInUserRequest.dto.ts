import { IsEmail, Length } from "class-validator";

export class SignInUserRequestDto{

  @IsEmail()
  email: string

  @Length(1, 255)
  password: string
}