import {FC, PropsWithChildren, useState} from 'react';
import {Box, Collapse, createStyles, Group, rem, Text, ThemeIcon, UnstyledButton,} from '@mantine/core';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';
import {Link, NavLink} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: rem(31),
        marginLeft: rem(30),
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    chevron: {
        transition: 'transform 200ms ease',
    },
}));

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
    link?: string
}

export function LinksGroup({icon: Icon, label, initiallyOpened, links, link}: LinksGroupProps) {
    const {classes, theme} = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
        <Text<'a'>
            component="a"
            className={classes.link}
            href={link.link}
            key={link.label}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
    ));

    const ButtonComponent = link ? ({children}:PropsWithChildren) => <UnstyledButton className={classes.control} component={NavLink} to={link}>{children}</UnstyledButton> :
        ({children}: PropsWithChildren) =>   <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>{children}</UnstyledButton>

    return (
        <>
            <ButtonComponent>
                <Group position="apart" spacing={0}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon size="1.1rem"/>
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size="1rem"
                            stroke={1.5}
                            style={{
                                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                            }}
                        />
                    )}
                </Group>
            </ButtonComponent>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}


type TNavbarLinksGroupProps = {
    label: string,
    icon: FC<any>,
    link?: string,
    links?: Array<{ label: string, link: string }>
}

export function NavbarLinksGroup(props: TNavbarLinksGroupProps) {
    return (
        <Box
            sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            })}
        >
            <LinksGroup {...props} />
        </Box>
    );
}