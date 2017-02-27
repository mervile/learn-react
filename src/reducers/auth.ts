import {
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTRATION_SUCCESS,
} from '../actions';
import { TOKEN } from '../config';
import { IAuthState } from '../models';
import * as _ from 'lodash';

import * as jwt_decode from 'jwt-decode';

const token = localStorage.getItem(TOKEN) ? JSON.parse(localStorage.getItem(TOKEN)) : undefined;
let username = '';
if (token) {
    username = jwt_decode(token.token_id).username;
}
const initialState: IAuthState = {
    isAuthenticated: token ? true : false,
    username,
};

function auth(state = initialState, action: any): IAuthState {
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
            return initialState;
        default:
            return state;
    }
}

export default auth;
