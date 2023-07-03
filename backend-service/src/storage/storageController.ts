import {Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {StorageService} from "./storage.service";

@Controller('storage')
export class StorageController {

    constructor(private storageService: StorageService) {
    }

    @Post("store")
    @UseInterceptors(FileInterceptor("file"))
    store(@UploadedFile() file: Express.Multer.File) {

        const blob = Buffer.from(file.buffer)

        this.storageService.store(blob, file.mimetype, file.originalname)
            .then(r => {
                console.log(r)
            })
            .catch(e => console.log(e))

    }

    @Get("history/:key")
    async versions(@Param() {key}: { key: string }) {
        return await this.storageService.versions(key)
    }


    @Get("all")
    list() {
        return this.storageService.list()
    }


    @Get("read/:key")
    async read(@Param() {key}: { key: string }, @Res({passthrough: true}) res: Response) {
        const fileWithMetadata = await this.storageService.read(key)
        const byteArray = await fileWithMetadata.Body.transformToByteArray()



        //TODO - No idea what the heck is going on here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.set({
            'Content-Type': fileWithMetadata.ContentType,
        });

        return new StreamableFile(new Uint8Array(byteArray))
    }
}
