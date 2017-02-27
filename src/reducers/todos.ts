import {
    ADD_TODO_SUCCESS,
    DELETE_TODO_SUCCESS,
    LOGOUT,
    RECEIVE_TODOS,
    UPDATE_TODO_SUCCESS,
} from '../actions';
import { ITodosState } from '../models';
import * as _ from 'lodash';

const initialState: ITodosState = {
    didInvalidate: true,
    items: [],
    lastUpdated: Date.now(),
};

function todos(state = initialState, action: any): ITodosState {
    switch (action.type) {
        case ADD_TODO_SUCCESS:
            return {
                didInvalidate: false,
                items: [...state.items, action.todo],
                lastUpdated: Date.now(),
            };
        case RECEIVE_TODOS:
            return {
                didInvalidate: true,
                items: action.todos,
                lastUpdated: Date.now(),
            };
        case UPDATE_TODO_SUCCESS: {
            const items = state.items.slice();
            const index = _.indexOf(items, _.find(items, { id: action.todo.id }));
            items.splice(index, 1, action.todo);
            return {
                didInvalidate: false,
                items,
                lastUpdated: Date.now(),
            };
        }
        case DELETE_TODO_SUCCESS: {
            const items = _.filter(state.items, (item) => item.id !== action.id);
            return {
                didInvalidate: false,
                items,
                lastUpdated: state.lastUpdated,
            };
        }
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default todos;
