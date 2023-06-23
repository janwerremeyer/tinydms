import {configureStore} from '@reduxjs/toolkit'
import {apiRoot} from "../api/apiRoot.ts";

export const store = configureStore({
    reducer: {
        [apiRoot.reducerPath]: apiRoot.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiRoot.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch