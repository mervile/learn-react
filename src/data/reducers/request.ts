import { IRequestState } from '../../models';
import {
    ADD_TODO_FAILURE,
    ADD_TODO_REQUEST,
    ADD_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTRATION_FAILURE,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    TODOS_FAILURE,
    TODOS_REQUEST,
    TODOS_SUCCESS,
    UPDATE_TODO_FAILURE,
    UPDATE_TODO_REQUEST,
    UPDATE_TODO_SUCCESS,
} from '../actions';

import { requestFailure, requestSuccess, startRequest } from './utils';

const initialState: IRequestState = {
    error: null,
    isLoading: false,
    message: '',
    type: '',
};

function request(state = initialState, action: any): IRequestState {
    switch (action.type) {
        case TODOS_REQUEST:
        case ADD_TODO_REQUEST:
        case DELETE_TODO_REQUEST:
        case UPDATE_TODO_REQUEST:
        case LOGIN_REQUEST:
        case REGISTRATION_REQUEST:
            return startRequest(state, action);
        case ADD_TODO_FAILURE:
        case DELETE_TODO_FAILURE:
        case TODOS_FAILURE:
        case UPDATE_TODO_FAILURE:
        case LOGIN_FAILURE:
        case REGISTRATION_FAILURE:
            return requestFailure(state, action);
        case LOGIN_SUCCESS:
        case REGISTRATION_SUCCESS:
        case ADD_TODO_SUCCESS:
        case TODOS_SUCCESS:
        case DELETE_TODO_SUCCESS:
        case UPDATE_TODO_SUCCESS:
            return requestSuccess(state, action);
        default:
            return state;
    }
}

export default request;
