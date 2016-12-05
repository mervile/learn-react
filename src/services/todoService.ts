import 'whatwg-fetch';

import { ITodo } from '../models';

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

export {
    getTodoList,
    saveTodo,
};
