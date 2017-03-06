import 'whatwg-fetch';

import { API_URL, TOKEN } from '../config';
import { ITodo } from '../models';
import { getToken, handleErrors } from './utils';

// TODO https://github.com/werk85/fetch-intercept or api middleware?

const getAuth = () => {
    const token = getToken();
    let tokenId = '';
    if (typeof token !== 'undefined') {
        tokenId = token.token_id;
    }
    return `Bearer ${tokenId}`;
};

function getTodoList() {
    const auth = getAuth();
    return fetch(`${API_URL}/todos`, {
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

function saveTodo(todo: ITodo) {
    const auth = getAuth();
    return fetch(`${API_URL}/todo`, {
        body: JSON.stringify(todo),
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

function removeTodo(itemId: number) {
    const auth = getAuth();
    return fetch(`${API_URL}/todo?id=${itemId}`, {
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
    getTodoList,
    saveTodo,
    removeTodo,
};
