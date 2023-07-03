import {Injectable} from '@nestjs/common';
import {fromBuffer} from "pdf2pic";
import {StorageService} from "../storage/storage.service";

@Injectable()
export class PdfpreviewService {

    constructor(private storageService: StorageService) {
    }

    private base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    async thumbnail(buffer: Buffer) {

//        const buffer =  Buffer.from(byteArray.buffer, byteArray.byteOffset, byteArray.byteLength)


        const baseOptions = {
            width: 2550,
            height: 3300,
            density: 330,
        };


        const convert = fromBuffer(buffer, baseOptions)
        const result = await convert(1, true) as { base64: string }

        return this.base64ToArrayBuffer(result.base64)

    }

}
