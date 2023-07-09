package me.werremeyer.tinydms.FileReference;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("fileReference")
public class FileReferenceController {

    private FileReferenceRepository fileReferenceRepository;

    public FileReferenceController(FileReferenceRepository fileReferenceRepository) {
        this.fileReferenceRepository = fileReferenceRepository;
    }

    @GetMapping("")
    public Iterable<FileReference> all(){
            return fileReferenceRepository.findAll();
    }
}
