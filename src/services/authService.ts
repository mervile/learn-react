import { ICredentials } from '../models';
import 'whatwg-fetch';

import { AUTH_URL, PUBLIC_URL, TOKEN } from '../config';

function login(creds: ICredentials) {
    return fetch(`${AUTH_URL}/login`, {
            body: `username=${creds.username}&password=${creds.password}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        })
        .then((response: any) => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            } else {
                return response.json();
            }
        });
}

function logout() {
    localStorage.removeItem(TOKEN);
}

function register(creds: ICredentials) {
    return fetch(`${AUTH_URL}/register`, {
            body: `username=${creds.username}&password=${creds.password}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
        })
        .then((response: any) => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            } else {
                return response;
            }
        });
}

function validateUsername(username: string) {
    return fetch(`${PUBLIC_URL}/validate-username?username=${username}`, {
            method: 'GET',
        })
        .then((response: any) => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            } else {
                return response.json();
            }
        });
}

export {
    login,
    logout,
    register,
    validateUsername,
};
