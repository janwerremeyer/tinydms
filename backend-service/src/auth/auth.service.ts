import { Injectable } from "@nestjs/common";
import { UserService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../users/users.repository";

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private userRepository: UserRepository, private jwtService: JwtService) {
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.login(email, password);

    const payload = { sub: user.id, email: user.email, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async register(email: string, password: string) {
    return this.userService.createUser(email, password);
  }
}
