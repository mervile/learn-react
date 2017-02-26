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
import * as _ from 'lodash';

import * as jwt_decode from 'jwt-decode';

import { request, requestFailure } from './utils';

const token = localStorage.getItem(TOKEN) ? JSON.parse(localStorage.getItem(TOKEN)) : undefined;
let username = '';
if (token) {
    username = jwt_decode(token.token_id).username;
}
const initialState: IAuthState = {
    error: null,
    isAuthenticated: token ? true : false,
    requestStatus: { isLoading: false, type: '' },
    username,
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
                requestStatus: { isLoading: false, type: '' },
                username: action.username,
            });
        }
        case LOGOUT: {
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
