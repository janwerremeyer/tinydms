import AuthService from "../../service/AuthService.ts";

type TAuthGuardProps = {
    children: any
}

export const AuthGuard2 = ({children}: TAuthGuardProps) => {
    const isAuthenticated = AuthService.isLoggedIn()

    if (isAuthenticated) {
        return children
    }

    AuthService.doLogin()

    return <div>Authenticating</div>
}