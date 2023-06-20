import { SetMetadata } from "@nestjs/common";
import { ERole } from "./role.enum";


export const ROLES_KEY = "roles";
export const Roles = (roles: Array<ERole.Admin | ERole.User>) => SetMetadata(ROLES_KEY, roles);
