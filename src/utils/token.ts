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

const getAuth = () => {
    const token = getToken();
    let tokenId = '';
    if (typeof token !== 'undefined') {
        tokenId = token.token_id;
    }
    return `Bearer ${tokenId}`;
};

export {
    getAuth,
    getToken,
    getTokenUsername,
};
