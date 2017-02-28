import { ITodo } from '../models';
import { removeTodo, saveTodo } from '../services/todoService';

const ADD_TODO = 'ADD_TODO';
const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

const UPDATE_TODO = 'UPDATE_TODO';
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

const DELETE_TODO = 'DELETE_TODO';
const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

// action creators
function addTodo(description: string) {
    return {
        type: ADD_TODO,
        description,
    };
};

function addTodoSuccess(todo: ITodo) {
    return {
        message: 'Added new todo successfully!',
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
        return saveTodo({ id: -1, description, status: 0, userId: '' }) // TODO
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

function updateTodoSuccess(todo: ITodo) {
    return {
        message: 'Successfully updated todo!',
        type: UPDATE_TODO_SUCCESS,
        todo,
    };
};

function updateTodoFailure(error: Response) {
    return {
        type: UPDATE_TODO_FAILURE,
        error,
    };
};

function requestUpdateTodo(todo: ITodo) {
    return (dispatch: any) => {
        dispatch(updateTodo(todo));
        return saveTodo(todo)
            .then((updated: ITodo) =>
                dispatch(updateTodoSuccess(updated))
            ).catch((error: Response) =>
                dispatch(updateTodoFailure(error))
            );
    };
}

function deleteTodo(id: number) {
    return {
        type: DELETE_TODO,
        id,
    };
};

function deleteTodoSuccess(id: number) {
    return {
        message: 'Successfully deleted todo!',
        type: DELETE_TODO_SUCCESS,
        id,
    };
};

function deleteTodoFailure(error: Response) {
    return {
        type: DELETE_TODO_FAILURE,
        error,
    };
};

function requestDeleteTodo(id: number) {
    return (dispatch: any) => {
        dispatch(deleteTodo(id));
        return removeTodo(id)
            .then((deleted: ITodo) =>
                dispatch(deleteTodoSuccess(deleted.id))
            ).catch((error: Response) =>
                dispatch(deleteTodoFailure(error))
            );
    };
}

export {
    ADD_TODO,
    ADD_TODO_FAILURE,
    ADD_TODO_SUCCESS,
    UPDATE_TODO,
    UPDATE_TODO_FAILURE,
    UPDATE_TODO_SUCCESS,
    DELETE_TODO,
    DELETE_TODO_FAILURE,
    DELETE_TODO_SUCCESS,
    requestAddTodo,
    requestUpdateTodo,
    requestDeleteTodo,
}
