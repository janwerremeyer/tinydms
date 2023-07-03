import {ListObjectsCommandOutput} from "@aws-sdk/client-s3";
import {Table} from "@mantine/core";
import {FileSize} from "../../component/FileSize.tsx";
import {DateTime} from "luxon";


type TListViewProps = {
    data: ListObjectsCommandOutput
}

export const ListView = ({data}: TListViewProps) => {
    console.log(data)

    return <Table verticalSpacing={"xs"} highlightOnHover striped>
        <thead>
            <tr>
                <th>Filename</th>
                <th>Modified</th>
                <th>Size</th>
            </tr>
        </thead>
        <tbody>
        {data.Contents?.map(f => <tr key={f.Key}>
            <td>{f.Key}</td>
            <td>{new Intl.DateTimeFormat("de-de", {dateStyle: "short", timeStyle: "short"}).format(DateTime.fromISO(f.LastModified as any as string).toJSDate())}</td>
            <td><FileSize size={f.Size || 0}/></td>
        </tr>)}
        </tbody>
    </Table>
}