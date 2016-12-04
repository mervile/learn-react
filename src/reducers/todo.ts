import {
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO,
} from '../actions';
import { ITodo } from '../models';

function todo(state = {}, action: any) {
    switch (action.type) {
        case ADD_TODO:
            console.log('hep', state);
            return Object.assign({}, state, {
                description: action.description,
                id: -1,
                status: 0,
            });
        case UPDATE_TODO:
        case DELETE_TODO:
        default:
            return state;
    }
}

export default todo;
