import { ICredentials } from '../models';
import 'whatwg-fetch';

import { PUBLIC_URL, TOKEN } from '../config';

function login(creds: ICredentials) {
    return fetch(`${PUBLIC_URL}/auth/login`, {
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
    return fetch(`${PUBLIC_URL}/auth/register`, {
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

export {
    login,
    logout,
    register,
};
