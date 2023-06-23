import {Injectable} from '@nestjs/common';
import {
    KeycloakConnectOptions,
    KeycloakConnectOptionsFactory,
    PolicyEnforcementMode,
    TokenValidation
} from 'nest-keycloak-connect';
import * as process from "process";

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

    createKeycloakConnectOptions(): KeycloakConnectOptions {
        return {
            authServerUrl: process.env.AUTH_SERVER_URL,
            realm: process.env.REALM,
            clientId: process.env.CLIENT_ID,
            secret: process.env.SECRET,
            cookieKey: 'KEYCLOAK_JWT',
            logLevels: ['verbose'],
            useNestLogger: false,
            policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
            tokenValidation: TokenValidation.ONLINE,
        };
    }

}
