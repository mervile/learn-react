import { List, ListItem } from "material-ui/List";

import * as React from "react";
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor } from "react-dnd";

import { ITodoItem, ItemTypes, Status } from "../models";
import TodoItem from "./TodoItem";

import "./TodoItemList.scss";

interface ITodoItemListProps {
    todos: ITodoItem[];
    status: Status;
    statusName?: string;
    isOver?: boolean;
    connectDropTarget?: ConnectDropTarget;
    updateTodoList(itemId: string, newStatus: number): void;
}

const listTarget = {
    drop(props: ITodoItemListProps, monitor: DropTargetMonitor) {
        const { id } = monitor.getItem() as ITodoItem;
        props.updateTodoList(id, props.status);
    },
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

class TodoItemList extends React.Component<ITodoItemListProps, {}> {
    constructor() {
        super();
    }

    public render() {
        const { todos, status, statusName, connectDropTarget, isOver} = this.props;
        const items = this.renderList(todos);
        const title = statusName ? statusName : Status[status]
        return connectDropTarget(
            <div className="todoItemList" style={{backgroundColor: isOver ? "yellow" : "white"}}>
                <h3>{title}</h3>
                <List>{items}</List>
            </div>
        );
    }

    private handleStatusChange(itemId: string, event: any, index: number, value: number) {
        this.props.updateTodoList(itemId, value);
    }

    private renderList(todos: ITodoItem[]) {
        return todos.map((item: ITodoItem) =>
            <ListItem key={item.id}>
                <TodoItem item={item} onStatusUpdate={this.handleStatusChange.bind(this, item.id)} />
            </ListItem>);
    }
}

// Exporting as React.Component.. is a work around for Typescript issue
// "JSX element attributes type may not be a union type"
export default DropTarget(ItemTypes.TodoItem, listTarget,
    collect)(TodoItemList) as React.ComponentClass<ITodoItemListProps>;
