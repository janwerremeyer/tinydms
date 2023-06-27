import {AppShell} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {MainNavbar} from "./Navbar.tsx";
import {Header} from "./Header.tsx";

export const Layout = () => {
    return <AppShell
        padding="md"
        navbar={<MainNavbar/>}
        header={<Header/>}
    >
        <Outlet/>
    </AppShell>
}