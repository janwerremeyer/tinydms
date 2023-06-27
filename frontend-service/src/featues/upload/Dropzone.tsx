import {Group, rem, Text, useMantineTheme} from "@mantine/core";
import {Dropzone as MantineDropzone, DropzoneProps, PDF_MIME_TYPE} from "@mantine/dropzone";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";


export const Dropzone = (props: Partial<DropzoneProps>) => {
    const theme = useMantineTheme();

    return <MantineDropzone
        onDrop={(files) => console.log('accepted files', files)}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={PDF_MIME_TYPE}
        {...props}
    >
        <Group position="center" spacing="xl" style={{minHeight: rem(220), pointerEvents: 'none'}}>
            <MantineDropzone.Accept>
                <IconUpload
                    size="3.2rem"
                    stroke={1.5}
                    color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                />
            </MantineDropzone.Accept>
            <MantineDropzone.Reject>
                <IconX
                    size="3.2rem"
                    stroke={1.5}
                    color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                />
            </MantineDropzone.Reject>
            <MantineDropzone.Idle>
                <IconPhoto size="3.2rem" stroke={1.5}/>
            </MantineDropzone.Idle>

            <div>
                <Text size="xl" inline>
                    Drag files here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                    Upload as many files as you like, each file should not exceed 5mb
                </Text>
            </div>
        </Group>
    </MantineDropzone>
}