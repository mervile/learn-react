// Auth actions, selectors and reducers
import * as _ from 'lodash';
import { I18n } from 'react-redux-i18n';
import { browserHistory } from 'react-router';
import { createSelector } from 'reselect';

import { PATHS, TOKEN } from '../../config';
import { IAuthState, ICredentials, IStateTree } from '../../models';
import * as authService from '../../services/authService';
import { requestFailure, requestSuccess, startRequest } from '../../utils/handleRequests';
import { getToken, getTokenUsername } from '../../utils/token';

// Action constants
// Exported for mainly for unit tests
export const LOGIN_REQUEST  = 'app/auth/LOGIN_REQUEST';
export const LOGIN_FAILURE  = 'app/auth/LOGIN_FAILURE';
export const LOGIN_SUCCESS  = 'app/auth/LOGIN_SUCCESS';
export const LOGOUT = 'app/auth/LOGOUT';
export const REGISTRATION_REQUEST  = 'app/auth/REGISTRATION_REQUEST';
export const REGISTRATION_FAILURE  = 'app/auth/REGISTRATION_FAILURE';
export const REGISTRATION_SUCCESS  = 'app/auth/REGISTRATION_SUCCESS';

// Action creators
function requestLogin() {
    return {
        type: LOGIN_REQUEST,
    };
};

function loginFailure(error: any) {
    return {
        type: LOGIN_FAILURE,
        error,
    };
};

function loginSuccess(username: string) {
    return {
        type: LOGIN_SUCCESS,
        username,
    };
};

function login(creds: ICredentials) {
    return (dispatch: any) => {
        dispatch(requestLogin());
        return authService.login(creds)
            .then((res: any) => {
                localStorage.setItem(TOKEN, JSON.stringify(res));
                dispatch(loginSuccess(getTokenUsername()));
                browserHistory.push(PATHS.HOME);
            }).catch((error: Response) =>
                dispatch(loginFailure(error))
            );
    };
}

function logout() {
    authService.logout();
    return {
        type: LOGOUT,
    };
}

function requestRegistration() {
    return {
        type: REGISTRATION_REQUEST,
    };
};

function registrationFailure(error: any) {
    return {
        type: REGISTRATION_FAILURE,
        error,
    };
};

function registrationSuccess() {
    return {
        message: I18n.t('auth.registrationComplete'),
        type: REGISTRATION_SUCCESS,
    };
};

function register(creds: ICredentials) {
    return (dispatch: any) => {
        dispatch(requestRegistration());
        return authService.register(creds)
            .then((res: any) => {
                dispatch(registrationSuccess());
            }).catch((error: Response) =>
                dispatch(registrationFailure(error))
            );
    };
}

// reducers
function getInitialState(): IAuthState {
    return {
        isAuthenticated: getToken() !== undefined ? true : false,
        request: {
            error: null,
            isLoading: false,
            message: '',
            type: '',
        },
        username: getTokenUsername(),
    };
}

function auth(state = getInitialState(), action: any): IAuthState {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTRATION_REQUEST:
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                request: startRequest(state.request, action),
            });
        case LOGIN_SUCCESS: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                isAuthenticated: true,
                request: requestSuccess(state.request, action),
                username: action.username,
            });
        }
        case LOGOUT: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                isAuthenticated: false,
            });
        }
        case REGISTRATION_SUCCESS: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                request: requestSuccess(state.request, action),
            });
        }
        case LOGIN_FAILURE:
        case REGISTRATION_FAILURE: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                request: requestFailure(state.request, action),
            });
        }
        default:
            return state;
    }
}

// selectors
const getIsLoading      = (state: IStateTree) => state.auth.request.isLoading;
const getType           = (state: IStateTree) => state.auth.request.type;
const getRequestMessage = (state: IStateTree) => state.auth.request.message;

const isRegistering = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === REGISTRATION_REQUEST
);

const isLoggingIn = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === LOGIN_REQUEST
);

const getRegistrationMessage = createSelector(
    getType, getRequestMessage, (type, message) => type === REGISTRATION_SUCCESS ? message : ''
);


const getAuthRequestResult =  (state: IStateTree) => {
    return {
        error: state.auth.request.error,
        message: state.auth.request.message,
    };
};

// Export reducer which will be combined with other
// reducers in top level
export default auth;

// Export public interface for interacting with
// this feature
export {
    getAuthRequestResult,
    getRegistrationMessage,
    isLoggingIn,
    isRegistering,
    login,
    logout,
    register,
}
