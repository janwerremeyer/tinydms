import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "./component/Layout";
import {WelcomeIndex} from "./pages/welcome";
import {AuthGuard} from "./lib/auth/AuthGuard.tsx";
import {Provider} from "react-redux";
import {store} from "./state/store.ts";
import AuthService from "./service/AuthService.ts";
import {AuthGuard2} from "./lib/auth/AuthGuard2.tsx";
import "./lib/math/global.ts"
import {SessionUpdater} from "./component/auth/SessionUpdater.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthGuard target={"/app/welcome"}/>
    },
    {
        path: "/app",
        element: <AuthGuard2><SessionUpdater/><Provider store={store}><Layout/></Provider></AuthGuard2>,
        children: [
            {
                path: "welcome",
                element: <WelcomeIndex/>
            }
        ]
    }
])

async function main(){

    await AuthService.initKeycloak(() => {})

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    )
}

main()