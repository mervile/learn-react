// Auth actions, selectors and reducers
import * as _ from 'lodash';
import { I18n } from 'react-redux-i18n';
import { createSelector } from 'reselect';

import { IStateTree, IUser, IUsersState } from '../../models';
import * as userService from '../../services/userService';
import { requestFailure, requestSuccess, startRequest } from '../../utils/handleRequests';

// Action constants
// Exported for mainly for unit tests
export const USERS_REQUEST = 'app/auth/USERS_REQUEST';
export const USERS_FAILURE = 'app/auth/USERS_FAILURE';
export const USERS_SUCCESS = 'app/users/USERS_SUCCESS';

// Action creators
function requestUsers() {
    return {
        type: USERS_REQUEST,
    };
}

function requestUsersSuccess(users: IUser[]) {
    return {
        type: USERS_SUCCESS,
        users,
    };
}

function requestUsersFailure(error: Response) {
    return {
        type: USERS_FAILURE,
        error,
    };
}

function getUsers() {
    return (dispatch: any) => {
        dispatch(requestUsers());
        return userService.getUsers()
            .then((users: IUser[]) => {
                dispatch(requestUsersSuccess(users));
            }).catch((error: Response) =>
                dispatch(requestUsersFailure(error))
            );
    };
}

function shouldGetUsers(state: IStateTree) {
    const users = state.users;
    if (!users) {
        return true;
    } else if (users.request.isLoading) {
        return false;
    } else {
        return users.didInvalidate;
    }
}

function getUsersIfNeeded() {
    return (dispatch: any, getState: any) => {
        if (shouldGetUsers(getState())) {
            return dispatch(getUsers());
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}

// reducers
function getInitialState(): IUsersState {
    return {
        didInvalidate: true,
        lastUpdated: Date.now(),
        request: {
            error: null,
            isLoading: false,
            message: '',
            type: '',
        },
        users: [],
    };
}

function users(state = getInitialState(), action: any): IUsersState {
    switch (action.type) {
        case USERS_REQUEST:
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                request: startRequest(state.request, action),
            });
        case USERS_SUCCESS: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                didInvalidate: true,
                lastUpdated: Date.now(),
                request: requestSuccess(state.request, action),
                users: action.users,
            });
        }
        case USERS_FAILURE: {
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
const getIsLoading       = (state: IStateTree) => state.users.request.isLoading;
const getType            = (state: IStateTree) => state.users.request.type;
const getAllUsers        = (state: IStateTree) => state.users.users;

const isGettingUsers = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === USERS_REQUEST
);

const getUsersRequestResult =  (state: IStateTree) => {
    return {
        error: state.users.request.error,
        message: state.users.request.message,
    };
};

// Export reducer which will be combined with other
// reducers in top level
export default users;

// Export public interface for interacting with
// this feature
export {
    getAllUsers,
    getUsersIfNeeded,
    getUsersRequestResult,
    isGettingUsers,
}
