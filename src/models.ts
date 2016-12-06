enum Status {
    New,
    InProgress,
    Done
}

// Types for drag and drop
const ItemTypes = {
    TodoItem: 'todoItem',
};

interface ITodo { id: number; description: string; status: Status; }

interface IError {
    type: string;
    error: Response | null;
}

interface IRequestStatus {
    type: string;
    isLoading: boolean;
    id?: number;
}

interface ITodosState {
    requestStatus: IRequestStatus;
    didInvalidate: boolean;
    lastUpdated: number;
    items: ITodo[];
    error: IError;
}

interface IStateTree {
    todos: ITodosState;
}

export {
    Status,
    IStateTree,
    ITodosState,
    IRequestStatus,
    ITodo,
    ItemTypes,
}
