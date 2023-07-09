import {Badge, MultiSelect} from '@mantine/core';
import {useSetTagsMutation} from "../../api/fileReference.slice.ts";

type TFileTagsProps = {
    tags: Array<string>,
    id: string
}


export const FileTags = ({tags, id}: TFileTagsProps) => {

    const [updateTags] = useSetTagsMutation()

    return <>
        <MultiSelect
            data={tags.map(t => ({value: t, label: t}))}
            placeholder="Select Tags"
            searchable
            value={tags}
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
                // updateTags({id, tags: [...tags, query]})
                // setData((current) => [...current, item]);
                return {label: query, value: query};
            }}
            onChange={newState => {
                updateTags({id, tags: newState})
            }}
        />

    </>
}