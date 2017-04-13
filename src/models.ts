import { I18nState } from 'react-redux-i18n';

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
    projectId?: string;
}

interface IProject {
    id: string;
    title: string;
    description: string;
    todos: ITodo[];
}

interface IRequestState {
    type: string;
    isLoading: boolean;
    id?: number;
    error: Response | null;
    message: string;
}

interface IProjectsState {
    didInvalidate: boolean;
    lastUpdated: number;
    projects: IProject[];
    request: IRequestState;
}

interface ITodosState {
    didInvalidate: boolean;
    lastUpdated: number;
    items: ITodo[];
    request: IRequestState;
}

interface IAuthState {
    isAuthenticated: boolean;
    username: string;
    request: IRequestState;
 }

interface IStateTree {
    todos: ITodosState;
    auth: IAuthState;
    projects: IProjectsState;
    i18n: I18nState;
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
    IProject,
    IProjectsState,
}
