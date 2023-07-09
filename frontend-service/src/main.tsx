import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {Layout} from "./component/Layout";
import {WelcomeIndex} from "./pages/welcome";
import {AuthGuard} from "./lib/auth/AuthGuard.tsx";
import {Provider} from "react-redux";
import {store} from "./state/store.ts";
import AuthService from "./service/AuthService.ts";
import {AuthGuard2} from "./lib/auth/AuthGuard2.tsx";
import "./lib/math/global.ts"
import {SessionUpdater} from "./component/auth/SessionUpdater.tsx";
import {UploadFeature} from "./featues/upload";
import {AllFilesPage} from "./featues/files/AllFilesPage.tsx";
import {pdfjs} from 'react-pdf';
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

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
            },
            {
                path: "upload",
                element: <UploadFeature/>
            },
            {
                path: "files",
                element: <Outlet/>,
                children: [
                    {
                        path: "all",
                        element: <AllFilesPage/>
                    }
                ]
            }
        ]
    }
])

async function main() {

    await AuthService.initKeycloak(() => {
    })

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <MantineProvider withNormalizeCSS withGlobalStyles>
                <Notifications/>
                <RouterProvider router={router}/>
            </MantineProvider>
        </React.StrictMode>,
    )
}

main()