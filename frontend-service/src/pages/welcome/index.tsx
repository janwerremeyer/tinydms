import {useExampleQuery} from "../../api/testSlice.ts";
import {PdfViewer} from "../../component/PdfViewer";

export const WelcomeIndex = () => {

    return <div>Welcome
        <PdfViewer file={`http://localhost:3000/storage/read/OCC_Allg_Kundeninformation_2022_09.pdf`}/>
    </div>
}