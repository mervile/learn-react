export enum Status {
    New,
    InProgress,
    Done
}

export interface ITodo { id: number; description: string; status: Status; }

// Types for drag and drop
export const ItemTypes = {
    TodoItem: "todoItem",
};

export interface IStateTree {
    todos: ITodo[];
    value: string;
}
