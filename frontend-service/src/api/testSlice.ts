import {apiRoot} from "./apiRoot.ts";


const testSlice = apiRoot.injectEndpoints({
    endpoints: build => ({
        example: build.query({
            query: () => ""
        })
    })
})


export const {useExampleQuery} = testSlice