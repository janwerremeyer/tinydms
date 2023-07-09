import {AppShell} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {MainNavbar} from "./Navbar.tsx";
import {Header} from "./Header.tsx";
import {notifications} from '@mantine/notifications';
import {useIsPending} from "../../api/hooks/isPending.ts";
import {useEffect} from "react";

export const Layout = () => {

    const isPending = useIsPending()

    useEffect(() => {
        if (isPending) {
            notifications.show({
                id: 'load-data',
                loading: true,
                title: 'Loading your data',
                message: 'Data will be loaded in 3 seconds, you cannot close this yet',
                autoClose: false,
                withCloseButton: false,
            });
        } else {
            notifications.hide('load-data')
        }

    }, [isPending])

    return <>
        <AppShell
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
    </>
}