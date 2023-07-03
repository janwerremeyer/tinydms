import {AppShell} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {MainNavbar} from "./Navbar.tsx";
import {Header} from "./Header.tsx";

export const Layout = () => {
    return <AppShell
        padding="xs"
        styles={{
            main: {
                paddingTop: "calc(var(--mantine-header-height, 0px) + 0.0rem)",
                paddingLeft: "calc(var(--mantine-navbar-width, 0px) + 0.0rem)",
                paddingRight: "calc(var(--mantine-aside-width, 0px) + 0.0rem)"
            }
        }}
        navbar={<MainNavbar/>}
        header={<Header/>}
    >
        <Outlet/>
    </AppShell>
}