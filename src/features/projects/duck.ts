// Project actions, selectors and reducers
import * as _ from 'lodash';
import { createSelector } from 'reselect';

import { IProject, IProjectsState, IStateTree } from '../../models';
import * as projectService from '../../services/projectService';
import { requestFailure, requestSuccess, startRequest } from '../../utils/handleRequests';

// Action constants
// Exported for mainly for unit tests
export const PROJECTS_REQUEST  = 'app/auth/PROJECTS_REQUEST';
export const PROJECTS_FAILURE  = 'app/auth/PROJECTS_FAILURE';
export const PROJECTS_SUCCESS  = 'app/auth/PROJECTS_SUCCESS';

// Action creators
function requestProjects() {
    return {
        type: PROJECTS_REQUEST,
    };
};

function projectsFailure(error: any) {
    return {
        type: PROJECTS_FAILURE,
        error,
    };
};

function projectsSuccess(projects: IProject[]) {
    return {
        type: PROJECTS_SUCCESS,
        projects,
    };
};

function getProjects() {
    return (dispatch: any) => {
        dispatch(requestProjects());
        return projectService.getProjects()
            .then((projects: IProject[]) =>
                dispatch(projectsSuccess(projects))
            ).catch((error: Response) =>
                dispatch(projectsFailure(error))
            );
    };
}

function shouldGetProjects(state: IStateTree) {
    const projects = state.projects;
    if (!projects) {
        return true;
    } else if (projects.request.isLoading) {
        return false;
    } else {
        return projects.didInvalidate;
    }
}

function getProjectsIfNeeded() {
    return (dispatch: any, getState: any) => {
        if (shouldGetProjects(getState())) {
            return dispatch(getProjects());
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}

// reducers
function getInitialState(): IProjectsState {
    return {
        didInvalidate: true,
        lastUpdated: Date.now(),
        projects: [],
        request: {
            error: null,
            isLoading: false,
            message: '',
            type: '',
        },
    };
}

function projects(state = getInitialState(), action: any): IProjectsState {
    switch (action.type) {
        case PROJECTS_REQUEST:
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                request: startRequest(state.request, action),
            });
        case PROJECTS_SUCCESS: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                didInvalidate: true,
                lastUpdated: Date.now(),
                projects: action.projects,
                request: requestSuccess(state.request, action),
            });
        }
        case PROJECTS_FAILURE: {
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
const getIsLoading       = (state: IStateTree) => state.auth.request.isLoading;
const getType            = (state: IStateTree) => state.auth.request.type;
const getUserProjects    = (state: IStateTree) => state.projects.projects;

const isGettingProjects = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === PROJECTS_REQUEST
);

// Export reducer which will be combined with other
// reducers in top level
export default projects;

// Export public interface for interacting with
// this feature
export {
    getProjectsIfNeeded,
    getUserProjects,
    isGettingProjects,
}
