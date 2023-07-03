import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {ConfigModule as CustomConfigModule} from "./config/config.module";
import {KeycloakConnectModule} from "nest-keycloak-connect";
import {KeycloakConfigService} from "./config/keycloak-config.service";
import {ProductsModule} from './products/products.module';
import {ConfigModule} from "@nestjs/config";
import { StorageModule } from './storage/storage.module';
import { PreviewModule } from './preview/preview.module';

const KeycloakConnectModuleInstance = KeycloakConnectModule.registerAsync({
    useExisting: KeycloakConfigService,
    imports: [CustomConfigModule]
})

@Module({
    imports: [ConfigModule.forRoot(), KeycloakConnectModuleInstance, ProductsModule,  StorageModule, PreviewModule],
    controllers: [AppController],
    providers: [
        AppService
    ]
})
export class AppModule {
}
