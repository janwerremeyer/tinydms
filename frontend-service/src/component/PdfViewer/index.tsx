import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { Document, Page } from 'react-pdf';
import {useState} from "react";

type TPdfViewerProps = {
    file: string
}

export const PdfViewer = ({file} : TPdfViewerProps) => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages } : any) {
        setNumPages(numPages);
        setPageNumber(1);
    }


    return <div>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {[Array(numPages)].map((_,p) => <Page pageNumber={p} />)}
        </Document>

    </div>
}