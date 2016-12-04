import { ITodo } from '../models';

const ADD_TODO = 'ADD_TODO';
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

const UPDATE_TODO = 'UPDATE_TODO';
const DELETE_TODO = 'DELETE_TODO';

// action creators
function addTodo(description: string) {
    return {
        type: ADD_TODO,
        description,
    };
};

function updateTodo(todo: ITodo) {
    return {
        type: UPDATE_TODO,
        todo,
    };
}

function deleteTodo(id: number) {
    return {
        type: DELETE_TODO,
        id,
    };
};

export {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    addTodo,
    updateTodo,
    deleteTodo,
}
