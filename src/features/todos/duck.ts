// Todos actions, selectors and reducers
import * as _ from 'lodash';
import { I18n } from 'react-redux-i18n';
import { createSelector } from 'reselect';

import { IStateTree, ITodo, ITodosState } from '../../models';
import { getTodoList, removeTodo, saveTodo } from '../../services/todoService';
import { requestFailure, requestSuccess, startRequest } from '../../utils/handleRequests';

import { LOGOUT } from '../auth/duck';

// Action constants
// Exported for unit tests
export const ADD_TODO_REQUEST = 'app/todos/ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'app/todos/ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'app/todos/ADD_TODO_FAILURE';

export const UPDATE_TODO_REQUEST = 'app/todos/UPDATE_TODO_REQUEST';
export const UPDATE_TODO_SUCCESS = 'app/todos/UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'app/todos/UPDATE_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'app/todos/DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'app/todos/DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'app/todos/DELETE_TODO_FAILURE';

export const TODOS_REQUEST = 'app/todos/TODOS_REQUEST';
export const TODOS_FAILURE = 'app/todos/TODOS_FAILURE';
export const TODOS_SUCCESS = 'app/todos/TODOS_SUCCESS';

// Action creators
function requestTodos() {
    return {
        type: TODOS_REQUEST,
    };
};

function requestTodosFailure(error: any) {
    return {
        type: TODOS_FAILURE,
        error,
    };
};

function receiveTodos(todos: ITodo[]) {
    return {
        type: TODOS_SUCCESS,
        todos,
    };
};

function getTodos() {
    return (dispatch: any) => {
        // Update app state to inform
        // API call is started.
        dispatch(requestTodos());
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.
        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        return getTodoList()
            .then((todos: ITodo[]) =>
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(receiveTodos(todos))
            ).catch((error: Response) =>
                dispatch(requestTodosFailure(error))
            );
    };
}

function shouldGetTodos(state: IStateTree) {
    const todos = state.todos;
    if (!todos) {
        return true;
    } else if (todos.request.isLoading) {
        return false;
    } else {
        return todos.didInvalidate;
    }
}

function getTodosIfNeeded() {
    // Note that the function also receives getState()
    // which lets you choose what to dispatch next.
    // This is useful for avoiding a network request if
    // a cached value is already available.
    return (dispatch: any, getState: any) => {
        if (shouldGetTodos(getState())) {
            // Dispatch a thunk from thunk!
            return dispatch(getTodos());
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve();
        }
    };
}

function addTodo(description: string) {
    return {
        type: ADD_TODO_REQUEST,
        description,
    };
};

function addTodoSuccess(todo: ITodo) {
    return {
        message: I18n.t('todos.todoAdded'),
        type: ADD_TODO_SUCCESS,
        todo,
    };
};

function addTodoFailure(error: Response) {
    return {
        type: ADD_TODO_FAILURE,
        error,
    };
};

function requestAddTodo(description: string) {
    return (dispatch: any) => {
        dispatch(addTodo(description));
        return saveTodo({ id: -1, description, status: 0, userId: '' }) // TODO
            .then((todo: ITodo) =>
                dispatch(addTodoSuccess(todo))
            ).catch((error: Response) =>
                dispatch(addTodoFailure(error))
            );
    };
}


function updateTodo(todo: ITodo) {
    return {
        type: UPDATE_TODO_REQUEST,
        todo,
    };
}

function updateTodoSuccess(todo: ITodo) {
    return {
        message: I18n.t('todos.todoUpdated'),
        type: UPDATE_TODO_SUCCESS,
        todo,
    };
};

function updateTodoFailure(error: Response) {
    return {
        type: UPDATE_TODO_FAILURE,
        error,
    };
};

function requestUpdateTodo(todo: ITodo) {
    return (dispatch: any) => {
        dispatch(updateTodo(todo));
        return saveTodo(todo)
            .then((updated: ITodo) =>
                dispatch(updateTodoSuccess(updated))
            ).catch((error: Response) =>
                dispatch(updateTodoFailure(error))
            );
    };
}

function deleteTodo(id: number) {
    return {
        type: DELETE_TODO_REQUEST,
        id,
    };
};

function deleteTodoSuccess(id: number) {
    return {
        message: I18n.t('todos.todoDeleted'),
        type: DELETE_TODO_SUCCESS,
        id,
    };
};

function deleteTodoFailure(error: Response) {
    return {
        type: DELETE_TODO_FAILURE,
        error,
    };
};

function requestDeleteTodo(id: number) {
    return (dispatch: any) => {
        dispatch(deleteTodo(id));
        return removeTodo(id)
            .then((deleted: ITodo) =>
                dispatch(deleteTodoSuccess(deleted.id))
            ).catch((error: Response) =>
                dispatch(deleteTodoFailure(error))
            );
    };
}

// reducers
function getInitialState(): ITodosState {
    return {
        didInvalidate: true,
        items: [],
        lastUpdated: Date.now(),
        request: {
            error: null,
            isLoading: false,
            message: '',
            type: '',
        },
    };
}

function todos(state = getInitialState(), action: any): ITodosState {
    switch (action.type) {
        case TODOS_REQUEST:
        case ADD_TODO_REQUEST:
        case DELETE_TODO_REQUEST:
        case UPDATE_TODO_REQUEST:
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                request: startRequest(state.request, action),
            });
        case ADD_TODO_SUCCESS:
            return {
                didInvalidate: false,
                items: [...state.items, action.todo],
                lastUpdated: Date.now(),
                request: requestSuccess(state.request, action),
            };
        case TODOS_SUCCESS:
            return {
                didInvalidate: true,
                items: action.todos,
                lastUpdated: Date.now(),
                request: requestSuccess(state.request, action),
            };
        case UPDATE_TODO_SUCCESS: {
            const items = state.items.slice();
            const index = _.indexOf(items, _.find(items, { id: action.todo.id }));
            items.splice(index, 1, action.todo);
            return {
                didInvalidate: false,
                items,
                lastUpdated: Date.now(),
                request: requestSuccess(state.request, action),
            };
        }
        case DELETE_TODO_SUCCESS: {
            const items = _.filter(state.items, (item) => item.id !== action.id);
            return {
                didInvalidate: false,
                items,
                lastUpdated: state.lastUpdated,
                request: requestSuccess(state.request, action),
            };
        }
        case ADD_TODO_FAILURE:
        case DELETE_TODO_FAILURE:
        case TODOS_FAILURE:
        case UPDATE_TODO_FAILURE: {
            const copy = JSON.parse(JSON.stringify(state));
            return _.assign(copy, {
                request: requestFailure(state.request, action),
            });
        }
        case LOGOUT:
            return getInitialState();
        default:
            return state;
    }
}

// Selectors
const getIsLoading     = (state: IStateTree) => state.todos.request.isLoading;
const getType          = (state: IStateTree) => state.todos.request.type;
const isRequestTarget  = (state: IStateTree, props: any) => state.todos.request.id === props.todo.id;
const todosByStatus    = (state: IStateTree, props: any): ITodo[] =>
    state.todos.items.filter(t => t.status === props.status);

const isAddingTodo = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === ADD_TODO_REQUEST
);

const isUpdatingTodo = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === UPDATE_TODO_REQUEST
);

const isDeletingTodo = createSelector(
    getIsLoading, getType, isRequestTarget, (isLoading, type, isTarget) =>
        isLoading && type === DELETE_TODO_REQUEST && isTarget
);

const isGettingTodos = createSelector(
    getIsLoading, getType, (isLoading, type) => isLoading && type === TODOS_REQUEST
);

const getTodosByStatus = createSelector(
  todosByStatus, (todos: ITodo[]) => todos);

const getTodosRequestResult = (state: IStateTree) => {
    return {
        error: state.todos.request.error,
        message: state.todos.request.message,
    };
};

// Export reducer which will be combined with other
// reducers in top level
export default todos;

// Export public interface for interacting with
// this feature
export {
    getTodosRequestResult,
    getTodosIfNeeded,
    requestAddTodo,
    requestUpdateTodo,
    requestDeleteTodo,
    isGettingTodos,
    isAddingTodo,
    isUpdatingTodo,
    isDeletingTodo,
    getTodosByStatus
}
