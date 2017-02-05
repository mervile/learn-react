import { IAuthState, ITodosState } from '../models';
import * as _ from 'lodash';

function request(state: IAuthState | ITodosState, action: any) {
    const copy = JSON.parse(JSON.stringify(state));
    return _.assign(copy, {
        error: null,
        requestStatus: {
            id: action.id || undefined,
            isLoading: true,
            type: action.type,
        },
    });
}

function requestFailure(state: IAuthState | ITodosState, action: any) {
    const copy = JSON.parse(JSON.stringify(state));
    const err = action.error;
    return _.assign(copy, {
        error: {
            error: action.error,
            message: err.status ? `${err.status} - ${err.statusText}` : `${err}`,
        },
        requestStatus: {
            isLoading: false,
            type: '',
        },
    });
}

export {
    request,
    requestFailure,
}
