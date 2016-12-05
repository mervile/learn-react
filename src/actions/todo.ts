import { ITodo } from '../models';
import { saveTodo } from '../services/todoService';

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

function addTodoSuccess(todo: ITodo) {
    return {
        type: ADD_TODO_SUCCESS,
        todo,
    };
};

function addTodoFailure(error: Response) {
    return {
        type: ADD_TODO_FAILURE,
        error,
    };
};

function requestAddTodo(description: string) {
    return (dispatch: any) => {
        dispatch(addTodo(description));
        return saveTodo({ id: -1, description, status: 0 })
            .then((todo: ITodo) =>
                dispatch(addTodoSuccess(todo))
            ).catch((error: Response) =>
                dispatch(addTodoFailure(error))
            );
    };
}


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
    ADD_TODO_FAILURE,
    ADD_TODO_SUCCESS,
    UPDATE_TODO,
    DELETE_TODO,
    requestAddTodo,
    updateTodo,
    deleteTodo,
}
