import {Loader} from "@mantine/core";


type TIsLoadingOrErrorProps = {
    isLoading: boolean,
    error?: any,
    children: React.ReactNode
}

export const IsLoadingOrError = ({isLoading, error, children} : TIsLoadingOrErrorProps) => {
    if(isLoading){
        return <Loader variant={"dots"}/>
    }

    return <>{children}</>
}