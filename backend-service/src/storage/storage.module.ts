import {Module} from '@nestjs/common';
import {StorageService} from "./storage.service";
import {StorageController} from "./storageController";

@Module({
    providers: [StorageService],
    exports: [StorageService],
    controllers:[StorageController]
})
export class StorageModule {
}
