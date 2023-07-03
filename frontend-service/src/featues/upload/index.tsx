import {Dropzone} from "./Dropzone.tsx";
import {useState} from "react";
import {FileRejection, FileWithPath} from "@mantine/dropzone";


export const UploadFeature = () => {

    const [state, setFiles] = useState<Array<FileWithPath>>([])


    const uploadFile = (file: FileWithPath) => {
        const formData = new FormData();
        formData.append("file", file)

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/storage/store")
        xhr.send(formData)

    }

    const onDrop = (files: Array<FileWithPath>) => {
        setFiles([...state, ...files])
    }

    const onReject = (files: Array<FileRejection>) => {

    }

    return <div>
        <Dropzone onDrop={onDrop} onReject={onReject}/>


        {state.map(file => {
            return <div key={file.name}>{file.name}
                <button onClick={() => uploadFile(file)}>Send it</button>
            </div>
        })}
    </div>
}