import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import AuthService from "../service/AuthService.ts";

// initialize an empty api service that we'll inject endpoints into later as needed
export const apiRoot = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        credentials: "include",
        mode: "cors",
        prepareHeaders: headers => {

            const token = AuthService.getToken()
            console.log(token)

            headers.set("authorization", "Bearer " + token)
            return headers
        }
    }),
    endpoints: () => ({}),
})