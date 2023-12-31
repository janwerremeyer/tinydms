import {Navigate} from "react-router-dom";
import AuthService from "../../service/AuthService.ts";

type TAuthGuardProps = {
    target: string
}

export const AuthGuard = ({target}: TAuthGuardProps) => {
    const isAuthenticated = AuthService.isLoggedIn()

    if (isAuthenticated) {
        return <Navigate to={target} replace={true}/>
    }

    AuthService.doLogin()

    return <div>Authenticating</div>
}