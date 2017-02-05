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

import { request, requestFailure } from './utils';

const initialState: ITodosState = {
    didInvalidate: true,
    error: null,
    items: [],
    lastUpdated: Date.now(),
    requestStatus: { isLoading: false, type: '' },
};

function todos(state = initialState, action: any): ITodosState {
    switch (action.type) {
        case ADD_TODO:
        case REQUEST_TODOS:
        case UPDATE_TODO:
        case DELETE_TODO:
            return request(state, action);
        case ADD_TODO_FAILURE:
        case REQUEST_TODOS_FAILURE:
        case UPDATE_TODO_FAILURE:
        case DELETE_TODO_FAILURE:
            return requestFailure(state, action);
        case ADD_TODO_SUCCESS:
            return {
                didInvalidate: false,
                error: null,
                items: [...state.items, action.todo],
                lastUpdated: Date.now(),
                requestStatus: { isLoading: false, type: action.type },
            };
        case RECEIVE_TODOS:
            return {
                didInvalidate: true,
                error: null,
                items: action.todos,
                lastUpdated: Date.now(),
                requestStatus: { isLoading: false, type: action.type },
            };
        case UPDATE_TODO_SUCCESS: {
            const items = state.items.slice();
            const index = _.indexOf(items, _.find(items, { id: action.todo.id }));
            items.splice(index, 1, action.todo);
            return {
                didInvalidate: false,
                error: null,
                items,
                lastUpdated: Date.now(),
                requestStatus: { isLoading: false, type: action.type },
            };
        }
        case DELETE_TODO_SUCCESS: {
            const items = _.filter(state.items, (item) => item.id !== action.id);
            return {
                didInvalidate: false,
                error: null,
                items,
                lastUpdated: state.lastUpdated,
                requestStatus: { isLoading: false, type: action.type },
            };
        }
        default:
            return state;
    }
}

export default todos;
