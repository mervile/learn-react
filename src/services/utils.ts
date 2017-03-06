import { TOKEN } from '../config';
import * as auth from './authService';

function handleErrors(response: any) {
    if (response.status === 401 || response.status === 403) {
        auth.logout();
    }
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response;
}

function getToken() {
    return localStorage.getItem(TOKEN) !== null ? JSON.parse(localStorage.getItem(TOKEN)) : undefined;
}
export { getToken, handleErrors };
