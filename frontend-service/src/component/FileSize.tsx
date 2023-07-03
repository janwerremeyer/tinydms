import {filesize} from "filesize";

type TFileSizeProps = {
    size: number
}

export const FileSize = ({size}: TFileSizeProps) => {
    return <>{filesize(size,{base: 2, standard: "jedec"})}</>
}