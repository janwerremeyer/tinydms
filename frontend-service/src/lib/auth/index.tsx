import jwt_decode from "jwt-decode";

const TOKEN_KEY = "TINY_DMS_TOKEN"

const setToken = (token: string) => {
    window.sessionStorage.setItem(TOKEN_KEY, token)
}

const getToken = () => {
    return window.sessionStorage.getItem(TOKEN_KEY)
}

const decodeToken = (token: string) => {
    return jwt_decode(token || "")
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Auth {

    export const isLoggedIn = () => {
        const token = getToken()
        const decoded = decodeToken(token || "")

        return decoded
    }


    export const doLogin = async (email: string, password: string) => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"email": email, "password": password})
        };

        await fetch('http://localhost:3000/auth/login', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setToken(response?.access_token)
            })
            .catch(err => console.error(err));
    }

    export const doRegister = async (email: string, password: string) => {
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"email": email, "password": password})
        };

        await fetch('http://localhost:3000/auth/register', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    }
}