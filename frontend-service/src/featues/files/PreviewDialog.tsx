import {Modal} from "@mantine/core";
import { Document, Page } from 'react-pdf';
import {useState} from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"

type TPreviewDialogProps = {
    filename: string,
    opened: boolean,
    close: () => void,

}

export const PreviewDialog = ({filename, opened, close}: TPreviewDialogProps) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages } : any) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset : any) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    return <Modal size="calc(100vw - 5vh - 2rem)" opened={opened} onClose={close} closeOnEscape={true} title={filename} centered>
        <Document file={`http://localhost:3000/storage/read/${filename}`} onLoadSuccess={onDocumentLoadSuccess}>
            <Page width={1500} pageNumber={pageNumber} />
        </Document>
        <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
        >
            Previous
        </button>
        <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
        >
            Next
        </button>
        <p>
            Page {pageNumber} of {numPages}
        </p>
    </Modal>

}