import 'whatwg-fetch';

import { API_URL } from '../config';
import { IProject } from '../models';
import { handleErrors } from '../utils/handleErrors';
import { getToken } from '../utils/token';

const getAuth = () => {
    const token = getToken();
    let tokenId = '';
    if (typeof token !== 'undefined') {
        tokenId = token.token_id;
    }
    return `Bearer ${tokenId}`;
};

function getProjects() {
    const auth = getAuth();
    return fetch(`${API_URL}/projects`, {
        headers: {
            Authorization: auth,
        },
        method: 'GET',
    })
    .then(handleErrors)
    .then((response: any) => {
        return response.json();
    });
}

function saveProject(project: IProject) {
    const auth = getAuth();
    return fetch(`${API_URL}/project`, {
        body: JSON.stringify(project),
        headers: {
            Authorization: auth,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
    .then(handleErrors)
    .then((response: any) => {
        return response.json();
    });
}


export {
    getProjects,
    saveProject,
};
