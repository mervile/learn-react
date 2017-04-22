import 'whatwg-fetch';

import { API_URL } from '../config';
import { IProject, IUser } from '../models';
import { handleErrors } from '../utils/handleErrors';
import { getAuth } from '../utils/token';

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

function saveProject(project: IProject, users: IUser[]) {
    const auth = getAuth();
    return fetch(`${API_URL}/project`, {
        body: JSON.stringify({ project, users }),
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

function deleteProject(id: string) {
    const auth = getAuth();
    return fetch(`${API_URL}/project?id=${id}`, {
        headers: {
            Authorization: auth,
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    })
    .then(handleErrors)
    .then((response: any) => {
        return response.json();
    });
}

export {
    getProjects,
    deleteProject,
    saveProject,
};
