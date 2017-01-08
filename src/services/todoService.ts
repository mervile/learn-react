import { ITodo } from '../models';
import * as _ from 'lodash';
import 'whatwg-fetch';

const API_URL = 'http://localhost:8080/api';
// TODO 
// TODO https://github.com/werk85/fetch-intercept ?
const auth = 'Basic ' + window.btoa('test:password');

function getTodoList() {
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
