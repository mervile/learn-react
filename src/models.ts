export enum Status {
    New,
    InProgress,
    Done
}

export interface ITodo { id: number; description: string; status: Status; }

// Types for drag and drop
export const ItemTypes = {
    TodoItem: 'todoItem',
};

interface IError {
    type: string;
    error: Response | null;
}

export interface ITodosState {
    isFetching: boolean;
    didInvalidate: boolean;
    lastUpdated: number;
    items: ITodo[];
    error: IError;
}

export interface IStateTree {
    todos: ITodosState;
}
