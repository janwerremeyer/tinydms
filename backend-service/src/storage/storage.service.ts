import {Injectable} from "@nestjs/common";
import {
    GetObjectCommand,
    ListObjectsCommand,
    ListObjectVersionsCommand,
    PutObjectCommand,
    S3Client
} from "@aws-sdk/client-s3";
import {v4} from "uuid"
import {DateTime} from "luxon"

@Injectable()
export class StorageService {
    private s3Client: S3Client;
    private readonly BUCKET_NAME = "tinydms"

    constructor() {
        this.s3Client = new S3Client({
            endpoint: "https://s3.nl-ams.scw.cloud",
            region: "nl-ams",
            forcePathStyle: false,
        })
    }

    public async store(blob: Buffer, contentType: string, filename: string) {
        const id = v4()
        return await this.s3Client.send(new PutObjectCommand({
            Bucket: "tinydms", // The name of the bucket. For example, 'sample-bucket-101'.
            Key: filename, // The name of the object. For example, 'sample_upload.txt'.
            Body: blob,
            ContentType: contentType,
            Metadata: {
                id: id,
                uploaded: DateTime.now().toISO()
            }
        }))
    }

    public async versions(key: string) {
        return await this.s3Client.send(new ListObjectVersionsCommand({
            Bucket: this.BUCKET_NAME,
            KeyMarker: key.toUpperCase()
        }))
    }

    public async list() {
        const resp = await this.s3Client.send(new ListObjectsCommand({
            Bucket: "tinydms"
        }))

        return resp
    }

    public async read(key: string) {
        return await this.s3Client.send(new GetObjectCommand({
            Bucket: "tinydms",
            Key: key
        }))
    }

}