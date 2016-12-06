import { ITodo } from '../models';
import * as _ from 'lodash';
import 'whatwg-fetch';

const API_URL = 'http://localhost:8080';

function getTodoList() {
    return fetch(`${API_URL}/todos`)
        .then((response: any) => {
            return response.json();
        }).then((todos: ITodo[]) => {
            return todos;
        });
}

function saveTodo(todo: ITodo) {
    return fetch(`${API_URL}/todo`, {
        body: JSON.stringify(todo),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    })
    .then((response: any) => {
        return response.json();
    });
}

function removeTodo(itemId: number) {
    return fetch(`${API_URL}/todo?id=${itemId}`, {
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
