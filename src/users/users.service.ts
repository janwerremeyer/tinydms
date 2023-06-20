import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { UserRepository } from "./users.repository";
import { ERole } from "../auth/role.enum";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt");

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.user({ email });

    const match = await bcrypt.compare(password, user.password);
    delete user.password;
    if (match) return user;

    throw new UnauthorizedException();
  }

  async createUser(email: string, password: string): Promise<User> {
    const hash = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser({ email, password: hash, roles: [ERole.Admin] });

    delete user.password;

    return user;
  }

}