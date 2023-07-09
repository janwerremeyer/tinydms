package me.werremeyer.tinydms.Storage;

import me.werremeyer.tinydms.FileReference.FileReference;
import me.werremeyer.tinydms.FileReference.FileReferenceRepository;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.ListObjectVersionsResponse;

import java.io.IOException;
import java.util.Objects;

@RestController
@RequestMapping(("storage"))
public class StorageController {

    private final StorageService storageService;
    private final FileReferenceRepository fileReferenceRepository;

    public StorageController(StorageService storageService, FileReferenceRepository fileReferenceRepository) {
        this.storageService = storageService;
        this.fileReferenceRepository = fileReferenceRepository;
    }

    @PostMapping("store")
    public ResponseEntity<Void> store(@RequestParam("file") MultipartFile file) throws IOException {

        var filename = file.getOriginalFilename();
        var stream = file.getInputStream();
        var len = file.getSize();
        var type = file.getContentType();

        var existing = fileReferenceRepository.findByFilename(filename);

        FileReference fileReference;
        fileReference = Objects.requireNonNullElseGet(existing, FileReference::new);

        fileReference.setFilename(filename);
        fileReference.setSize(len);
        fileReference.setContentType(type);
        fileReferenceRepository.save(fileReference);

        storageService.write(filename, type, stream, len);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


    @GetMapping(value = "/read")
    public ResponseEntity<InputStreamResource> read(@RequestParam String filename) throws IOException {
        var metadata = storageService.readMetadata(filename);
        var binaryStream = storageService.read(filename);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(MediaType.valueOf(metadata.contentType()));

        InputStreamResource inputStreamResource = new InputStreamResource(binaryStream);

        return new ResponseEntity<>(inputStreamResource, responseHeaders, HttpStatus.OK);

    }

    @GetMapping("/history")
    public ResponseEntity<ListObjectVersionsResponse> history(@RequestParam String filename) {
        ListObjectVersionsResponse listObjectVersionsResponse = storageService.versions(filename);
        return new ResponseEntity<>(listObjectVersionsResponse, null, HttpStatus.OK);
    }


}
