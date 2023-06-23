import {useExampleQuery} from "../../api/testSlice.ts";

export const WelcomeIndex = () => {
    const {data, isLoading, error} = useExampleQuery({})

    return <div>Welcome

        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>
}