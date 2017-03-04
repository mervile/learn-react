import { IAuthState } from '../../models';
import { getToken } from '../../services/utils';
import {
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTRATION_SUCCESS,
} from '../actions';

import * as jwt_decode from 'jwt-decode';
import * as _ from 'lodash';

function getInitialState() {
    const token = getToken();
    let username = '';
    if (token) {
        username = jwt_decode(token.token_id).username;
    }
    return {
        isAuthenticated: token ? true : false,
        username,
    };
}

function auth(state = getInitialState(), action: any): IAuthState {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                isAuthenticated: true,
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
            return getInitialState();
        default:
            return state;
    }
}

export default auth;
