import {apiRoot} from "./apiRoot.ts";
import type {ListObjectVersionsCommandOutput} from "@aws-sdk/client-s3";

export type TFileReference = {
    id: string,
    filename: string,
    size: number,
    contentType: string,
    created: string,
    updated: string
}

export type TListResponse = Array<TFileReference>

export const storageSlice = apiRoot.injectEndpoints({
    endpoints: build => ({
        list: build.query<TListResponse, unknown>({
            query: () => `/storage/list`
        }),
        // read: build.query<any, string>({
        //     query: (key) => `/storage/read/${key}`
        // }),
        history: build.query<ListObjectVersionsCommandOutput, string>({
            query: (key) => `/storage/history?filename${key}`
        }),
    })
})

export const {useListQuery, useHistoryQuery} = storageSlice