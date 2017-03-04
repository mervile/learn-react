import { PATHS, TOKEN } from '../../config';
import { ICredentials } from '../../models';
import * as auth from '../../services/authService';

import * as jwt_decode from 'jwt-decode';
import { browserHistory } from 'react-router';

const LOGIN_REQUEST  = 'LOGIN_REQUEST';
const LOGIN_FAILURE  = 'LOGIN_FAILURE';
const LOGIN_SUCCESS  = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';
const REGISTRATION_REQUEST  = 'REGISTRATION_REQUEST';
const REGISTRATION_FAILURE  = 'REGISTRATION_FAILURE';
const REGISTRATION_SUCCESS  = 'REGISTRATION_SUCCESS';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
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
                const user = jwt_decode(res.token_id);
                localStorage.setItem(TOKEN, JSON.stringify(res));
                dispatch(loginSuccess(user.username));
                browserHistory.push(PATHS.HOME);
            }).catch((error: Response) =>
                dispatch(loginFailure(error))
            );
    };
}

function logout() {
    auth.logout();
    browserHistory.push(PATHS.LOGIN);
    return {
        type: LOGOUT,
    };
}

function requestRegistration() {
    return {
        type: REGISTRATION_REQUEST,
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
        message: 'Registration completed successfully. Now you can login!',
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
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTRATION_REQUEST,
    REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS,
    register,
}
