import { IRequestState } from '../models';
import * as _ from 'lodash';

function startRequest(state: IRequestState, action: any) {
    const copy = JSON.parse(JSON.stringify(state));
    return _.assign(copy, {
        error: null,
        id: action.id,
        isLoading: true,
        message: '',
        type: action.type,
    });
}

function requestFailure(state: IRequestState, action: any) {
    const copy = JSON.parse(JSON.stringify(state));
    const err = action.error;
    return _.assign(copy, {
        error: action.error,
        id: action.id,
        isLoading: false,
        message: err.status ? `${err.status} - ${err.statusText}` : `${err}`,
        type: '',
    });
}

function requestSuccess(state: IRequestState, action: any) {
    const copy = JSON.parse(JSON.stringify(state));
    return _.assign(copy, {
        error: null,
        id: action.id,
        isLoading: false,
        message: action.message,
        type: action.type,
    });
}

export {
    startRequest,
    requestFailure,
    requestSuccess,
}
