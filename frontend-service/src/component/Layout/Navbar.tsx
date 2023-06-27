import {createStyles, Navbar, ScrollArea} from '@mantine/core';
import {
    IconAdjustments,
    IconCalendarStats,
    IconFileAnalytics,
    IconFileUpload,
    IconGauge,
    IconLock,
    IconNotes,
    IconPresentationAnalytics
} from '@tabler/icons-react';
import {NavbarLinksGroup} from "./LinkGroup.tsx";


const navigationConfig = [
    {label: 'Dashboard', icon: IconGauge, link: "/app/welcome"},
    {label: 'Upload', icon: IconFileUpload, link: "/app/upload"},
    {
        label: 'Market news',
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            {label: 'Overview', link: '/'},
            {label: 'Forecasts', link: '/'},
            {label: 'Outlook', link: '/'},
            {label: 'Real time', link: '/'},
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        links: [
            {label: 'Upcoming releases', link: '/'},
            {label: 'Previous releases', link: '/'},
            {label: 'Releases schedule', link: '/'},
        ],
    },
    {label: 'Analytics', icon: IconPresentationAnalytics},
    {label: 'Contracts', icon: IconFileAnalytics},
    {label: 'Settings', icon: IconAdjustments},
    {
        label: 'Security',
        icon: IconLock,
        links: [
            {label: 'Enable 2FA', link: '/'},
            {label: 'Change password', link: '/'},
            {label: 'Recovery codes', link: '/'},
        ],
    },
];

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
        paddingTop: "0 !important"
    },

    links: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
    }
}));

export function MainNavbar() {
    const {classes} = useStyles();
    const links = navigationConfig.map((item) => <NavbarLinksGroup {...item} key={item.label}/>);

    return (

        <Navbar height={800} width={{sm: 300}} p="md" className={classes.navbar}>
            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div>{links}</div>
            </Navbar.Section>
        </Navbar>
    );
}