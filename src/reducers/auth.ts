import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    REQUEST_LOGIN,
} from '../actions';
import { TOKEN } from '../config';
import { IAuthState } from '../models';
import { logout } from '../services/authService';

const initialState: IAuthState = {
    error: null,
    isAuthenticated: localStorage.getItem(TOKEN) ? true : false,
    requestStatus: { isLoading: false, type: '' },
    username: localStorage.getItem(TOKEN) ? JSON.parse(localStorage.getItem(TOKEN)).username : '',
};

function auth(state = initialState, action: any): IAuthState {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                error: null,
                isAuthenticated: false,
                requestStatus: { isLoading: true, type: action.type },
                username: '',
            };
        case LOGIN_SUCCESS:
            return {
                error: null,
                isAuthenticated: true,
                requestStatus: { isLoading: false, type: '' },
                username: action.username,
            };
        case LOGIN_FAILURE:
            return {
                error: {
                    error: action.error,
                    message: 'Wrong username or password!',
                },
                isAuthenticated: false,
                requestStatus: { isLoading: false, type: '' },
                username: '',
            };
        case LOGOUT:
            logout();
            return {
                error: null,
                isAuthenticated: false,
                requestStatus: { isLoading: false, type: '' },
                username: '',
            };
        default:
            return state;
    }
}

export default auth;
