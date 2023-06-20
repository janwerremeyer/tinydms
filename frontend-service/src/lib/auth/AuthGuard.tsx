import {Navigate} from "react-router-dom";

type TAuthGuardProps = {
    target: string
}

export const AuthGuard = ({target }: TAuthGuardProps) => {
    const isAuthenticated = true;

    if(isAuthenticated){
        return   <Navigate to={target} replace={true} />
    }
    return  <Navigate to={"/auth/login"} replace={true} />
}