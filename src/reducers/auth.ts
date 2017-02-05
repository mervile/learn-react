import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTRATION_FAILURE,
    REGISTRATION_SUCCESS,
    REQUEST_LOGIN,
    REQUEST_REGISTRATION,
} from '../actions';
import { TOKEN } from '../config';
import { IAuthState } from '../models';
import { logout } from '../services/authService';
import * as _ from 'lodash';

import { request, requestFailure } from './utils';

const initialState: IAuthState = {
    error: null,
    isAuthenticated: localStorage.getItem(TOKEN) ? true : false,
    requestStatus: { isLoading: false, type: '' },
    username: localStorage.getItem(TOKEN) ? JSON.parse(localStorage.getItem(TOKEN)).username : '',
};

function auth(state = initialState, action: any): IAuthState {
    switch (action.type) {
        case REQUEST_LOGIN:
        case REQUEST_REGISTRATION:
            return request(state, action);
        case LOGIN_FAILURE:
        case REGISTRATION_FAILURE:
            return requestFailure(state, action);
        case LOGIN_SUCCESS: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                isAuthenticated: true,
                username: action.username,
            });
        }
        case LOGOUT: {
            logout();
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                isAuthenticated: false,
            });
        }
        case REGISTRATION_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default auth;
