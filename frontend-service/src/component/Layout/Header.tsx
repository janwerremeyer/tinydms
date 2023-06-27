import {Container, createStyles, Group, rem, Header as MantineHeader} from "@mantine/core";
import {UserMenu} from "./UserMenu.tsx";
import {SessionTimer} from "../auth/SessionTimer.tsx";
import {Logo} from "./Logo.tsx";


const useStyles = createStyles((theme) => ({
    header: {},

    mainSection: {
        height: "100%"
    },

    group: {
      height: "100%"
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('xs')]: {
            display: 'none',
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    tabs: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tab: {
        fontWeight: 500,
        height: rem(38),
        backgroundColor: 'transparent',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },

        '&[data-active]': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        },
    },
}));

export const Header = () => {
    const {classes, theme, cx} = useStyles();
    return  <MantineHeader height={60}>
        <Container fluid className={classes.mainSection}>
            <Group position="apart" align={"center"} className={classes.group} >
                <Logo/>
                <SessionTimer/>
                <UserMenu/>
            </Group>
        </Container>
    </MantineHeader>
}