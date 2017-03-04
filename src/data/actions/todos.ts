import { IStateTree, ITodo } from '../../models';
import { getTodoList } from '../../services/todoService';

const TODOS_REQUEST = 'TODOS_REQUEST';
const TODOS_FAILURE = 'TODOS_FAILURE';
const TODOS_SUCCESS = 'TODOS_SUCCESS';

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
    } else if (state.request.isLoading) {
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

export {
    TODOS_REQUEST,
    TODOS_FAILURE,
    TODOS_SUCCESS,
    getTodosIfNeeded,
}
