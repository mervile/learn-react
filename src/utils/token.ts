import * as jwt_decode from 'jwt-decode';

import { TOKEN } from '../config';

function getToken() {
    return localStorage.getItem(TOKEN) !== null ? JSON.parse(localStorage.getItem(TOKEN)) : undefined;
}

function getTokenUsername() {
    const token = getToken();
    let username = '';
    if (token) {
        username = jwt_decode(token.token_id).username;
    }
    return username;
}

export {
    getToken,
    getTokenUsername,
};
