import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { RegisterUserRequestDto } from "./dto/RegisterUserRequest.dto";
import { SignInUserRequestDto } from "./dto/SignInUserRequest.dto";
import { Roles } from "./role.decorator";
import { ERole } from "./role.enum";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }


  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInDto: SignInUserRequestDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Roles([ERole.User])
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }


  @Post("register")
  register(@Body() registerDto: RegisterUserRequestDto) {
    return this.authService.register(registerDto.email, registerDto.password);
  }
}
