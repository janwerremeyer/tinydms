import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "./component/Layout";
import {WelcomeIndex} from "./component/features/welcome";
import {AuthGuard} from "./lib/auth/AuthGuard.tsx";
import {Provider} from "react-redux";
import {store} from "./state/store.ts";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthGuard target={"/app/welcome"}/>
    },
    {
        path: "/app",
        element: <Layout/>,
        children: [
            {
                path: "welcome",
                element: <WelcomeIndex/>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
