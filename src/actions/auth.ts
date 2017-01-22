import { TOKEN } from '../config';
import { ICredentials } from '../models';
import * as auth from '../services/authService';

const REQUEST_LOGIN  = 'REQUEST_LOGIN';
const LOGIN_FAILURE  = 'LOGIN_FAILURE';
const LOGIN_SUCCESS  = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

function requestLogin() {
    return {
        type: REQUEST_LOGIN,
    };
};

function loginFailure(error: any) {
    return {
        type: LOGIN_FAILURE,
        error,
    };
};

function loginSuccess(username: string) {
    return {
        type: LOGIN_SUCCESS,
        username,
    };
};

function login(creds: ICredentials) {
    return (dispatch: any) => {
        dispatch(requestLogin());
        return auth.login(creds)
            .then((res: any) => {
                localStorage.setItem(TOKEN, JSON.stringify(res));
                dispatch(loginSuccess(res.username));
            }).catch((error: Response) =>
                dispatch(loginFailure(error))
            );
    };
}

function logout() {
    return {
        type: LOGOUT,
    };
}

export {
    login,
    logout,
    REQUEST_LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
}
