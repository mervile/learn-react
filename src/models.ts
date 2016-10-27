export enum Status {
    New,
    InProgress,
    Done
}

export interface ITodoItemProps { description: string; status: Status; }

export interface ITodoItemListProps { items: ITodoItemProps[]; }
