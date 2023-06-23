import {Controller, Get, UseGuards} from "@nestjs/common";
import { AppService } from "./app.service";
import {AuthGuard} from "nest-keycloak-connect";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @UseGuards(AuthGuard)
  getHello() {
    return this.appService.getHello();
  }
}
