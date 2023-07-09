import {apiRoot} from "./apiRoot.ts";
import type {ListObjectVersionsCommandOutput} from "@aws-sdk/client-s3";


export const storageSlice = apiRoot.injectEndpoints({
    endpoints: build => ({
        history: build.query<ListObjectVersionsCommandOutput, string>({
            query: (key) => `/storage/history?filename${key}`
        }),
    })
})

export const {useHistoryQuery} = storageSlice