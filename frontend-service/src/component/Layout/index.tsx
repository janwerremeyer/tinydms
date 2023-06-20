import {AppShell, Header} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {MainNavbar} from "./Navbar.tsx";
import {UserMenu} from "./UserMenu.tsx";

export const Layout = () => {
    return <AppShell
        padding="md"
        navbar={<MainNavbar/>}
        header={<Header height={60} p="xs">
            <UserMenu/>
        </Header>}
    >
        <Outlet/>
    </AppShell>
}