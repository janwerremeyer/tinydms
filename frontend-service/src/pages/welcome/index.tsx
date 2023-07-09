import {PdfViewer, PdfViewerWrapper} from "../../component/PdfViewer";
import {useState} from "react";

export const WelcomeIndex = () => {

    const [isOpen, setOpen] = useState(false)

    return <div>Welcome

        <button onClick={() => setOpen(true)}>Open</button>

        <PdfViewerWrapper open={isOpen}>
            <PdfViewer  onClose={() => setOpen(false)} file={`http://localhost:3000/storage/read?filename=OCC_Allg_Kundeninformation_2022_09.pdf`}/>
        </PdfViewerWrapper>
    </div>
}