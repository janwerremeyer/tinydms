import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { DatabaseModule } from "../database/database.module";
import { UserRepository } from "./users.repository";

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  imports: [DatabaseModule]
})
export class UsersModule {
}
