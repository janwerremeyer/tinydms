import {Tabs, TabsValue} from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';


import {IconBoxPadding, IconList} from "@tabler/icons-react"
import React from "react";
import {ListView} from "./ListView.tsx";
import {IsLoadingOrError} from "../../component/IsLoadingOrError.tsx";
import {GalleryView} from "./GalleryView.tsx";
import {useAllQuery} from "../../api/fileReference.slice.ts";

export const AllFilesPage = () => {
    const {data, isLoading, error} = useAllQuery()

    const [defaultView, setDefaultView] = useLocalStorage<TabsValue>({key: "FILE_DEFAULT_VIEW", defaultValue: "list"})

    return <IsLoadingOrError isLoading={isLoading} error={error}>
        {data &&
            <Tabs value={defaultView} onTabChange={setDefaultView} >
                <Tabs.List>
                    <Tabs.Tab value="list" icon={<IconList size="0.8rem"/>}>List</Tabs.Tab>
                    <Tabs.Tab value="gallery" icon={<IconBoxPadding size="0.8rem"/>}>Gallery</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="list" pt="xs">
                    <ListView data={data}/>
                </Tabs.Panel>

                <Tabs.Panel value="gallery" pt="xs">
                    <GalleryView data={data}/>
                </Tabs.Panel>
            </Tabs>
        }
    </IsLoadingOrError>
}