import {apiRoot} from "./apiRoot.ts";

export type TFileReference = {
    id: string,
    filename: string,
    size: number,
    contentType: string,
    created: string,
    updated: string
}

export type TAllFilerReferenceResponse = Array<TFileReference>


export const fileReferenceSlice = apiRoot.injectEndpoints({
    endpoints: build => ({
        all: build.query<TAllFilerReferenceResponse, void>({
            query: () => `/fileReference`
        })
    })
})

export const {useAllQuery} = fileReferenceSlice