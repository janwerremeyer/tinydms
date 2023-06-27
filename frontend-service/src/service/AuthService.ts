import Keycloak from "keycloak-js";
import jwt_decode from "jwt-decode";
import {DateTime} from "luxon";

const _kc = new Keycloak({
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT
});

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = async (onAuthenticatedCallback: any) => {
    return await _kc.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
    })
        .then((authenticated) => {
            if (!authenticated) {
                console.log("user is not authenticated..!");
            }
            onAuthenticatedCallback();
        })
        .catch(console.error);
};

const doLogin = () => _kc.login();

const accountManagement = () => _kc.accountManagement()
export const accountManagementUrl = () => _kc.createAccountUrl({redirectUri:window.location.origin + window.location.pathname})

const doLogout = _kc.logout;
const getToken = () => _kc.token;
const isLoggedIn = () => !!_kc.token;

const updateToken = (minValidity = 5, successCallback? : () => void) =>
    _kc.updateToken(minValidity)
        .then(successCallback)
        .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getSessionLifetime = () => {
    const buildReturnObject = (seconds: number) => ({seconds})

    const token = getToken()
    if (!token) {
        return buildReturnObject(0)
    }

    const decoded = jwt_decode(token) as any

    const exp = DateTime.fromSeconds(decoded.exp)


    const diff = exp.diff(DateTime.now(), "seconds")

    return buildReturnObject(diff.seconds)
}

const hasRole = (roles: any) => roles.some((role: any) => _kc.hasRealmRole(role));

const UserService = {
    initKeycloak,
    doLogin,
    doLogout,
    isLoggedIn,
    getToken,
    updateToken,
    getUsername,
    hasRole,
    accountManagementUrl
};

export default UserService;
