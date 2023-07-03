import {useListQuery} from "../../api/storage.slice.ts";


export const AllFilesPage = () => {
    const {data, isLoading, error} = useListQuery({})



    return <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
}