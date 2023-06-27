import {useState} from 'react';
import {Avatar, createStyles, Group, Menu, rem, Text, UnstyledButton,} from '@mantine/core';
import {
    IconChevronDown,
    IconHeart,
    IconLogout,
    IconMessage,
    IconPlayerPause,
    IconSettings,
    IconStar,
    IconSwitchHorizontal,
    IconTrash,
} from '@tabler/icons-react';
import AuthService from "../../service/AuthService.ts";


const useStyles = createStyles((theme) => ({
    header: {},

    mainSection: {},

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


export const UserMenu = () => {
    const {classes, theme, cx} = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);


    const accountManagementUrl = AuthService.accountManagementUrl()

    return <Menu
        width={260}
        position="bottom-end"
        transitionProps={{transition: 'pop-top-right'}}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
    >
        <Menu.Target>
            <UnstyledButton
                className={cx(classes.user, {[classes.userActive]: userMenuOpened})}
            >
                <Group spacing={7}>
                    <Avatar src={"https://placehold.co/50x50"} alt={"Example"} radius="xl" size={20}/>
                    <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                        {AuthService.getUsername()}
                    </Text>
                    <IconChevronDown size={rem(12)} stroke={1.5}/>
                </Group>
            </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item
                icon={<IconHeart size="0.9rem" color={theme.colors.red[6]} stroke={1.5}/>}
            >
                Liked posts
            </Menu.Item>
            <Menu.Item
                icon={<IconStar size="0.9rem" color={theme.colors.yellow[6]} stroke={1.5}/>}
            >
                Saved posts
            </Menu.Item>
            <Menu.Item
                icon={<IconMessage size="0.9rem" color={theme.colors.blue[6]} stroke={1.5}/>}
            >
                Your comments
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item component={"a"} target={"_blank"} href={accountManagementUrl}
                       icon={<IconSettings size="0.9rem" stroke={1.5}/>}>
                Account settings
            </Menu.Item>
            <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5}/>}>
                Change account
            </Menu.Item>
            <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5}/>}>Logout</Menu.Item>

            <Menu.Divider/>

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<IconPlayerPause size="0.9rem" stroke={1.5}/>}>
                Pause subscription
            </Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size="0.9rem" stroke={1.5}/>}>
                Delete account
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>

}