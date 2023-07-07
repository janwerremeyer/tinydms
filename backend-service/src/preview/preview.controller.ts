import {Controller, Get, Param, Res, StreamableFile} from '@nestjs/common';
import {PdfpreviewService} from "./pdfpreview.service";
import {StorageService} from "../storage/storage.service";

@Controller('preview')
export class PreviewController {

    constructor(private previewService: PdfpreviewService, private storageService: StorageService) {
    }







    @Get("thumbnail/:key")
    async thumbnail(@Param() {key}: { key: string },  @Res({passthrough: true}) res: Response) {
        const s3Respones = await this.storageService.read(key)
        // const buffer = Buffer.from(await s3Respones.Body.transformToString())
        const byteArray = await s3Respones.Body.transformToByteArray()

        const buffer =  Buffer.from(byteArray.buffer, byteArray.byteOffset, byteArray.byteLength)
        const preview = await this.previewService.thumbnail(buffer)


        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.set({
            'Content-Type': "image/png"
        });

        return  new StreamableFile(preview)
        // return {"ok": true}
    }
}
