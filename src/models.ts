export enum Status {
    New,
    InProgress,
    Done
}

export interface ITodoItem { id: string; description: string; status: Status; }

// Types for drag and drop
export const ItemTypes = {
    TodoItem: "todoItem",
};
