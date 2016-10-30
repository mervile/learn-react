export enum Status {
    New,
    InProgress,
    Done
}

export interface ITodoItem { id: string; description: string; status: Status; }

export interface ITodoItemProps { item: ITodoItem; onStatusUpdate: any; }

export interface ITodoItemListProps { todos: ITodoItem[]; newTodo: ITodoItem; }
