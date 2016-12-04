import {
    ADD_TODO,
    DELETE_TODO,
    REQUEST_TODOS,
    REQUEST_TODOS_FAILURE,
    RECEIVE_TODOS,
    UPDATE_TODO,
} from '../actions';

import { IStateTree } from '../models';

const initialState: IStateTree = {
    todos: {
        didInvalidate: true,
        error: null,
        isFetching: false,
        items: [],
        lastUpdated: Date.now(),
    },
};

function todoApp(state = initialState, action: any) {
    switch (action.type) {
        case REQUEST_TODOS:
            return Object.assign({}, state, {
                todos: {
                    didInvalidate: false,
                    error: null,
                    isFetching: true,
                    items: state.todos.items,
                    lastUpdated: state.todos.lastUpdated,
                },
            });
        case REQUEST_TODOS_FAILURE:
            return Object.assign({}, state, {
                todos: {
                    didInvalidate: false,
                    error: action.error,
                    isFetching: false,
                    items: state.todos.items,
                    lastUpdated: state.todos.lastUpdated,
                },
            });
        case RECEIVE_TODOS:
            return Object.assign({}, state, {
                todos: {
                    didInvalidate: false,
                    error: null,
                    isFetching: false,
                    items: action.todos,
                    lastUpdated: Date.now(),
                },
            });
        case ADD_TODO:
        case UPDATE_TODO:
        case DELETE_TODO:
        default:
            return state;
    }
}

export default todoApp;