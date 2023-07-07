package me.werremeyer.tinydms.Preview;


import me.werremeyer.tinydms.Storage.StorageService;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.awt.image.BufferedImage;
import java.io.IOException;

@RestController
@RequestMapping(("preview"))
public class PreviewController {

    private final StorageService storageService;

    public PreviewController(StorageService storageService) {
        this.storageService = storageService;
    }


    @GetMapping(path = "/thumbnail", produces = "image/png")
    public BufferedImage thumbnail(@RequestParam String filename) throws IOException {
        var binaryStream = storageService.read(filename);

        PDDocument document = PDDocument.load(binaryStream);
        PDFRenderer pdfRenderer = new PDFRenderer(document);

        BufferedImage bim = pdfRenderer.renderImageWithDPI(0, 300, ImageType.RGB);
        document.close();


        return bim;
    }

}
