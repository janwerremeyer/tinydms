import {apiRoot, TAGS} from "./apiRoot.ts";

export type TFileReference = {
    id: string,
    filename: string,
    size: number,
    contentType: string,
    created: string,
    updated: string,
    tags: Array<string>
}

export type TAllFilerReferenceResponse = Array<TFileReference>


export const fileReferenceSlice = apiRoot.injectEndpoints({
    endpoints: build => ({
        all: build.query<TAllFilerReferenceResponse, void>({
            query: () => `/fileReference`,
            providesTags: (result) => result ?
                [...result.map(({id}) => ({type: TAGS.FILE_REFERENCE, id}))]
                : [TAGS.FILE_REFERENCE]
        }),
        setTags: build.mutation<TFileReference, { id: string, tags: string[] }>({
            query: ({id, tags}) => ({
                url: `/fileReference/${id}/tags`,
                body: tags,
                method: "POST"
            }),
            invalidatesTags: (result, e, arg) => [{type: TAGS.FILE_REFERENCE, id: arg.id}]
        })
    })
})

export const {useAllQuery, useSetTagsMutation} = fileReferenceSlice