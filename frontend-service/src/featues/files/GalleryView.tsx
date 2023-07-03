import {ListObjectsCommandOutput} from "@aws-sdk/client-s3";
import styled from "@emotion/styled";
import {Text} from "@mantine/core"
import {useDisclosure} from "@mantine/hooks";
import {PreviewDialog} from "./PreviewDialog.tsx";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  border-top: 1px solid black;
  border-left: 1px solid black;

  
`

const Cell = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  
  img {
    max-width: 80%;
  }
`


type TListViewProps = {
    data: ListObjectsCommandOutput
}

export const Document = ({filename}: {filename: string}) => {
    const [opened, { open, close }] = useDisclosure(false);
console.log(opened)

    return <Cell>
        <img  onClick={open} src={`http://localhost:3000/preview/thumbnail/${filename}`}/>
        <Text>{filename}</Text>
        <PreviewDialog filename={filename} opened={opened} close={close}/>
    </Cell>
}

export const GalleryView = ({data}: TListViewProps) => {
    console.log(data)

    return <Grid>
        {data.Contents?.map(f => <Document key={f.Key} filename={f.Key||""}/> )}
    </Grid>
}