import * as auth from '../services/authService';

function handleErrors(response: any) {
    if (response.status === 401 || response.status === 403) {
        auth.logout();
    }
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response;
}

export {
    handleErrors
};
