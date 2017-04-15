// Project actions, selectors and reducers
import * as _ from 'lodash';
import { I18n } from 'react-redux-i18n';
import { createSelector } from 'reselect';

import {
    IProject,
    IProjectWithTodos,
    IProjectsState,
    IStateTree,
    ITodo,
} from '../../models';
import * as projectService from '../../services/projectService';
import { requestFailure, requestSuccess, startRequest } from '../../utils/handleRequests';

// Action constants
// Exported for mainly for unit tests
export const PROJECTS_REQUEST  = 'app/auth/PROJECTS_REQUEST';
export const PROJECTS_FAILURE  = 'app/auth/PROJECTS_FAILURE';
export const PROJECTS_SUCCESS  = 'app/auth/PROJECTS_SUCCESS';
export const ADD_PROJECT_REQUEST  = 'app/auth/ADD_PROJECT_REQUEST';
export const ADD_PROJECT_FAILURE  = 'app/auth/ADD_PROJECT_FAILURE';
export const ADD_PROJECT_SUCCESS  = 'app/auth/ADD_PROJECT_SUCCESS';
export const UPDATE_PROJECT_REQUEST  = 'app/auth/UPDATE_PROJECT_REQUEST';
export const UPDATE_PROJECT_FAILURE  = 'app/auth/UPDATE_PROJECT_FAILURE';
export const UPDATE_PROJECT_SUCCESS  = 'app/auth/UPDATE_PROJECT_SUCCESS';
export const DELETE_PROJECT_REQUEST  = 'app/auth/DELETE_PROJECT_REQUEST';
export const DELETE_PROJECT_FAILURE  = 'app/auth/DELETE_PROJECT_FAILURE';
export const DELETE_PROJECT_SUCCESS  = 'app/auth/DELETE_PROJECT_SUCCESS';

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

function projectsSuccess(projects: IProjectWithTodos[]) {
    return {
        type: PROJECTS_SUCCESS,
        projects,
    };
};

function getProjects() {
    return (dispatch: any) => {
        dispatch(requestProjects());
        return projectService.getProjects()
            .then((projects: IProjectWithTodos[]) =>
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

function addProject() {
    return {
        type: ADD_PROJECT_REQUEST,
    };
};

function addProjectSuccess(project: IProject) {
    return {
        message: I18n.t('projects.projectAdded'),
        type: ADD_PROJECT_SUCCESS,
        project,
    };
};

function addProjectFailure(error: Response) {
    return {
        type: ADD_PROJECT_FAILURE,
        error,
    };
};

function requestAddProject(title: string, description: string) {
    return (dispatch: any) => {
        dispatch(addProject());
        return projectService.saveProject({
                id: '',
                description,
                title,
            })
            .then((project: IProject) =>
                dispatch(addProjectSuccess(project))
            ).catch((error: Response) =>
                dispatch(addProjectFailure(error))
            );
    };
}



// reducers
function getInitialState(): IProjectsState {
    return {
        didInvalidate: true,
        lastUpdated: Date.now(),
        projectsWithTodos: [],
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
        case ADD_PROJECT_REQUEST:
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
                projectsWithTodos: action.projects,
                request: requestSuccess(state.request, action),
            });
        }
        case ADD_PROJECT_SUCCESS: {
            const todos: ITodo[] = [];
            const projWithTodos = { project: action.project, todos };
            return {
                didInvalidate: false,
                lastUpdated: Date.now(),
                projectsWithTodos: [...state.projectsWithTodos, projWithTodos],
                request: requestSuccess(state.request, action),
            };
        }
        case ADD_PROJECT_FAILURE:
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
const getUserProjects    = (state: IStateTree) => state.projects.projectsWithTodos;

const isAddingProject = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === ADD_PROJECT_REQUEST
);

const isGettingProjects = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === PROJECTS_REQUEST
);

const getProjectsRequestResult = (state: IStateTree) => {
    return {
        error: state.projects.request.error,
        message: state.projects.request.message,
    };
};

// Export reducer which will be combined with other
// reducers in top level
export default projects;

// Export public interface for interacting with
// this feature
export {
    getProjectsIfNeeded,
    getUserProjects,
    isGettingProjects,
    isAddingProject,
    requestAddProject,
    getProjectsRequestResult,
}
