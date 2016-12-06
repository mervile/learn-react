import {
    ADD_TODO,
    ADD_TODO_FAILURE,
    ADD_TODO_SUCCESS,
    DELETE_TODO,
    DELETE_TODO_FAILURE,
    DELETE_TODO_SUCCESS,
    RECEIVE_TODOS,
    REQUEST_TODOS,
    REQUEST_TODOS_FAILURE,
    UPDATE_TODO,
    UPDATE_TODO_FAILURE,
    UPDATE_TODO_SUCCESS,
} from '../actions';
import { ITodosState } from '../models';
import * as _ from 'lodash';

const initialState: ITodosState = {
    didInvalidate: true,
    error: null,
    items: [],
    lastUpdated: Date.now(),
    requestStatus: { isLoading: false, type: '' },
};

function todos(state = initialState, action: any) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                items: state.items,
                lastUpdated: state.lastUpdated,
                requestStatus: { isLoading: true, type: action.type },
            });
        case ADD_TODO_SUCCESS:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                items: [...state.items, action.todo],
                lastUpdated: Date.now(),
                requestStatus: { isLoading: false, type: action.type },
            });
        case ADD_TODO_FAILURE:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: { error: action.error, type: action.type },
                items: state.items,
                lastUpdated: state.lastUpdated,
                requestStatus: { isLoading: false, type: action.type },
            });
        case REQUEST_TODOS:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                items: state.items,
                lastUpdated: state.lastUpdated,
                requestStatus: { isLoading: true, type: action.type },
            });
        case REQUEST_TODOS_FAILURE:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: { error: action.error, type: action.type },
                items: state.items,
                lastUpdated: state.lastUpdated,
                requestStatus: { isLoading: false, type: action.type },
            });
        case RECEIVE_TODOS:
            return Object.assign({}, state, {
                didInvalidate: true,
                error: null,
                items: action.todos,
                lastUpdated: Date.now(),
                requestStatus: { isLoading: false, type: action.type },
            });
        case UPDATE_TODO:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                items: state.items,
                lastUpdated: state.lastUpdated,
                requestStatus: { id: action.todo.id, isLoading: true, type: action.type },
            });
        case UPDATE_TODO_SUCCESS: {
            const items = state.items.slice();
            const index = _.indexOf(items, _.find(items, { id: action.todo.id }));
            items.splice(index, 1, action.todo);
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                items,
                lastUpdated: Date.now(),
                requestStatus: { isLoading: false, type: action.type },
            });
        }
        case UPDATE_TODO_FAILURE:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: { error: action.error, type: action.type },
                items: state.items,
                lastUpdated: state.lastUpdated,
                requestStatus: { isLoading: false, type: action.type },
            });
        case DELETE_TODO:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                items: state.items,
                lastUpdated: state.lastUpdated,
                requestStatus: { id: action.id, isLoading: true, type: action.type },
            });
        case DELETE_TODO_FAILURE:
            return Object.assign({}, state, {
                didInvalidate: false,
                error: { error: action.error, type: action.type },
                items: state.items,
                lastUpdated: state.lastUpdated,
                requestStatus: { isLoading: false, type: action.type },
            });
        case DELETE_TODO_SUCCESS: {
            const items = _.filter(state.items, (item) => item.id !== action.id);
            return Object.assign({}, state, {
                didInvalidate: false,
                error: null,
                items,
                lastUpdated: state.lastUpdated,
                requestStatus: { isLoading: false, type: action.type },
            });
        }
        default:
            return state;
    }
}

export default todos;
