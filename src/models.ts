enum Status {
    New,
    InProgress,
    Done
}

// Types for drag and drop
const ItemTypes = {
    TodoItem: 'todoItem',
};

interface ITodo {
    id: number;
    description: string;
    status: Status;
    userId: string;
}

interface IError {
    error: Response | null;
    message: string;
}

interface IRequestStatus {
    type: string;
    isLoading: boolean;
    id?: number;
}

interface ITodosState {
    error: IError;
    requestStatus: IRequestStatus;
    didInvalidate: boolean;
    lastUpdated: number;
    items: ITodo[];
}

interface IAuthState {
    isAuthenticated: boolean;
    requestStatus: IRequestStatus;
    error: IError;
    username: string;
 }

interface IStateTree {
    todos: ITodosState;
    auth: IAuthState;
}

interface ICredentials {
    username: string;
    password: string;
}

export {
    Status,
    IError,
    IStateTree,
    IAuthState,
    ITodosState,
    IRequestStatus,
    ITodo,
    ItemTypes,
    ICredentials,
}
