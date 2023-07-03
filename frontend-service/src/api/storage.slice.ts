import {apiRoot} from "./apiRoot.ts";
import type {ListObjectsCommandOutput, ListObjectVersionsCommandOutput} from "@aws-sdk/client-s3";

export const storageSlice = apiRoot.injectEndpoints({
    endpoints: build => ({
        list: build.query<ListObjectsCommandOutput, unknown>({
            query: () => `/storage/all`
        }),
        // read: build.query<any, string>({
        //     query: (key) => `/storage/read/${key}`
        // }),
        history: build.query<ListObjectVersionsCommandOutput, string>({
            query: (key) => `/storage/history/${key}`
        }),
    })
})

export const {useListQuery, useHistoryQuery} = storageSlice