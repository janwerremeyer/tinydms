import {Table} from "@mantine/core";
import {FileSize} from "../../component/FileSize.tsx";
import {DateTime} from "luxon";
import {TFileReference} from "../../api/fileReference.slice.ts";
import {FileTags} from "./FileTags.tsx";


type TListViewProps = {
    data: Array<TFileReference>
}

export const ListView = ({data}: TListViewProps) => {

    return <Table verticalSpacing={"xs"} highlightOnHover striped>
        <thead>
        <tr>
            <th>Filename</th>
            <th>Tags</th>
            <th>Modified</th>
            <th>Size</th>
        </tr>
        </thead>
        <tbody>
        {[...data].sort((a, b) => (a.filename > b.filename) ? 1 : -1 ).map(f => <tr key={f.id}>
            <td>{f.filename}</td>
            <td><FileTags id={f.id} tags={f.tags}/></td>
            <td>{new Intl.DateTimeFormat("de-de", {
                dateStyle: "short",
                timeStyle: "short"
            }).format(DateTime.fromISO(f.updated).toJSDate())}</td>
            <td><FileSize size={f.size || 0}/></td>
        </tr>)}
        </tbody>
    </Table>
}