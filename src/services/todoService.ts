import { ITodo } from '../models';
import 'whatwg-fetch';

import { API_URL, TOKEN } from '../config';

// TODO https://github.com/werk85/fetch-intercept or api middleware?

const getAuth = () => 'Bearer ' + JSON.parse(localStorage.getItem(TOKEN)).token_id;

function getTodoList() {
    const auth = getAuth();
    return fetch(`${API_URL}/todos`, {
        headers: {
            Authorization: auth,
        },
        method: 'GET',
    })
        .then((response: any) => {
            return response.json();
        }).then((todos: ITodo[]) => {
            return todos;
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
    .then((response: any) => {
        return response.json();
    });
}

export {
    getTodoList,
    saveTodo,
    removeTodo,
};
