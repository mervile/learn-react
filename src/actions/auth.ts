import { TOKEN } from '../config';
import { ICredentials } from '../models';
import * as auth from '../services/authService';

const REQUEST_LOGIN  = 'REQUEST_LOGIN';
const LOGIN_FAILURE  = 'LOGIN_FAILURE';
const LOGIN_SUCCESS  = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const REQUEST_REGISTRATION  = 'REQUEST_REGISTRATION';
const REGISTRATION_FAILURE  = 'REGISTRATION_FAILURE';
const REGISTRATION_SUCCESS  = 'REGISTRATION_SUCCESS';

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

function requestRegistration() {
    return {
        type: REQUEST_REGISTRATION,
    };
};

function registrationFailure(error: any) {
    return {
        type: REGISTRATION_FAILURE,
        error,
    };
};

function registrationSuccess() {
    return {
        type: REGISTRATION_SUCCESS,
    };
};

function register(creds: ICredentials) {
    return (dispatch: any) => {
        dispatch(requestRegistration());
        return auth.register(creds)
            .then((res: any) => {
                dispatch(registrationSuccess());
            }).catch((error: Response) =>
                dispatch(registrationFailure(error))
            );
    };
}


export {
    login,
    logout,
    REQUEST_LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    REQUEST_REGISTRATION,
    REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS,
    register,
}
