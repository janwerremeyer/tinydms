package me.werremeyer.tinydms.FileReference;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("fileReference")
public class FileReferenceController {

    private FileReferenceRepository fileReferenceRepository;

    public FileReferenceController(FileReferenceRepository fileReferenceRepository) {
        this.fileReferenceRepository = fileReferenceRepository;
    }

    @GetMapping("")
    public Iterable<FileReference> all() {
        return fileReferenceRepository.findAll();
    }


    @PostMapping("{id}/tags")
    public FileReference tags(@PathVariable String id, @RequestBody List<String> tags) {
        Optional<FileReference> ref = fileReferenceRepository.findById(UUID.fromString(id));

        if (ref.isPresent()) {
            var r = ref.get();
            r.setTags(tags);
            fileReferenceRepository.save(r);
            return r;
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND);

    }
}
