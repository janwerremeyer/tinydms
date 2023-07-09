import {useAppSelector} from "../../state/store.ts";

export const useIsPending = () => {
    return useAppSelector(state => Object.values(state.api.queries).some(query => query?.status === 'pending'))
}