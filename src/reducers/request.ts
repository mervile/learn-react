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
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS,
    REQUEST_LOGIN,
    REQUEST_REGISTRATION,
} from '../actions';
import { IRequestState } from '../models';

import { requestFailure, requestSuccess, startRequest } from './utils';

const initialState: IRequestState = {
    error: null,
    isLoading: false,
    message: '',
    type: '',
};

function request(state = initialState, action: any): IRequestState {
    switch (action.type) {
        case REQUEST_TODOS:
        case ADD_TODO:
        case DELETE_TODO:
        case UPDATE_TODO:
        case REQUEST_LOGIN:
        case REQUEST_REGISTRATION:
            return startRequest(state, action);
        case ADD_TODO_FAILURE:
        case DELETE_TODO_FAILURE:
        case REQUEST_TODOS_FAILURE:
        case UPDATE_TODO_FAILURE:
        case LOGIN_FAILURE:
        case REGISTRATION_FAILURE:
            return requestFailure(state, action);
        case LOGIN_SUCCESS:
        case REGISTRATION_SUCCESS:
        case ADD_TODO_SUCCESS:
        case RECEIVE_TODOS:
        case DELETE_TODO_SUCCESS:
        case UPDATE_TODO_SUCCESS:
            return requestSuccess(state, action);
        default:
            return state;
    }
}

export default request;
