import {Button, MantineProvider} from '@mantine/core';

export default function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Button>Welcome to Mantine!</Button>
        </MantineProvider>
    );
}