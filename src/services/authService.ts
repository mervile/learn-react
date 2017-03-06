import { browserHistory } from 'react-router';
import 'whatwg-fetch';

import { AUTH_URL, PATHS, PUBLIC_URL, TOKEN } from '../config';
import { ICredentials } from '../models';
import { handleErrors } from './utils';

function login(creds: ICredentials) {
    return fetch(`${AUTH_URL}/login`, {
            body: `username=${creds.username}&password=${creds.password}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        })
        .then(handleErrors)
        .then((response: any) => {
            return response.json();
        });
}

function logout() {
    localStorage.removeItem(TOKEN);
    browserHistory.push(PATHS.LOGIN);
}

function register(creds: ICredentials) {
    return fetch(`${AUTH_URL}/register`, {
            body: `username=${creds.username}&password=${creds.password}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        })
        .then(handleErrors)
        .then((response: any) => {
            return response;
        });
}

function validateUsername(username: string) {
    return fetch(`${PUBLIC_URL}/validate-username?username=${username}`, {
            method: 'GET',
        })
        .then(handleErrors)
        .then((response: any) => response.json())
        .catch((error: any) => {
            console.error('Error while validating username:', error);
            return { username: '' };
        });
}

export {
    login,
    logout,
    register,
    validateUsername,
};
