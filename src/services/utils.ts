import { TOKEN } from '../config';

function handleErrors(response: any) {
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response;
}

function getToken() {
    return localStorage.getItem(TOKEN) !== null ? JSON.parse(localStorage.getItem(TOKEN)) : undefined;
}
export { getToken, handleErrors };
