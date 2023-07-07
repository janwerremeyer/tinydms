package me.werremeyer.tinydms.Storage;

import me.werremeyer.tinydms.Storage.config.AWSCredentialsConfiguration;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.http.apache.ApacheHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;


@Service
public class StorageService {

    private S3Client s3client;


    public StorageService(AWSCredentialsConfiguration awsCredentialsConfiguration) throws URISyntaxException {

        this.s3client = S3Client.builder()
                .credentialsProvider(() -> new AwsCredentials() {
                    @Override
                    public String accessKeyId() {
                        return awsCredentialsConfiguration.getAccessKeyId();
                    }

                    @Override
                    public String secretAccessKey() {
                        return awsCredentialsConfiguration.getSecretAccessKey();
                    }
                })
                .httpClient(ApacheHttpClient.builder().build())
                .endpointOverride(new URI("http://127.0.0.1:9000"))
                .region(Region.of("nl-ams"))
                .forcePathStyle(false)
                .build();

    }


    public InputStream read(String filename) {
        GetObjectRequest objectRequest = GetObjectRequest
                .builder()
                .key(filename)
                .bucket("tinydms")
                .build();

        ResponseBytes<GetObjectResponse> objectBytes = this.s3client.getObjectAsBytes(objectRequest);

        return objectBytes.asInputStream();
    }


    public void write(String filename, String type, InputStream stream, long size) {
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket("tinydms")
                .key(filename)
                .contentType(type)
                .build();

        s3client.putObject(objectRequest, RequestBody.fromInputStream(stream, size));
    }

    public HeadObjectResponse readMetadata(String filename) {
        HeadObjectRequest headObjectRequest = HeadObjectRequest.builder()
                .bucket("tinydms")
                .key(filename)
                .build();


        return s3client.headObject(headObjectRequest);
    }


    public ListObjectsResponse list() {
        ListObjectsRequest listObjectsRequest = ListObjectsRequest.builder()
                .bucket("tinydms")
                .build();

        var response = s3client.listObjects(listObjectsRequest);

        return response;
    }

    public ListObjectVersionsResponse versions(String filename){
        ListObjectVersionsRequest listObjectVersionsRequest = ListObjectVersionsRequest.builder()
                .bucket("tinycmd")
                .keyMarker(filename.toUpperCase())
                .build();

        return s3client.listObjectVersions(listObjectVersionsRequest);
    }
}
