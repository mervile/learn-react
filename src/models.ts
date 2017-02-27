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

interface IRequestState {
    type: string;
    isLoading: boolean;
    id?: number;
    error: Response | null;
    message: string;
}

interface ITodosState {
    didInvalidate: boolean;
    lastUpdated: number;
    items: ITodo[];
}

interface IAuthState {
    isAuthenticated: boolean;
    username: string;
 }

interface IStateTree {
    todos: ITodosState;
    auth: IAuthState;
    request: IRequestState;
}

interface ICredentials {
    username: string;
    password: string;
}

interface IAsyncValidator {
    errorText: string;
    validate(value: string | number): Promise<any>;
}

interface IValidator {
    errorText: string;
    validate(value: string | number): boolean;
}

interface IField {
    isValid: boolean;
    value: string;
    name: string;
}

interface IFormState {
    fields: IField[];
    isValid: boolean;
}

export {
    Status,
    IStateTree,
    IAuthState,
    ITodosState,
    IRequestState,
    ITodo,
    ItemTypes,
    ICredentials,
    IField,
    IFormState,
    IValidator,
    IAsyncValidator,
}
