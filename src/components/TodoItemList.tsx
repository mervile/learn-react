import { List, ListItem } from "material-ui/List";

import * as React from "react";
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor } from "react-dnd";

import { ITodoItem, ItemTypes, Status } from "../models";
import TodoItem from "./TodoItem";

import "./TodoItemList.scss";

interface ITodoItemListProps {
    updateTodoStatus(itemId: number, newStatus: number): void;
    deleteTodo(itemId: number): void;
    todos: ITodoItem[];
    status: Status;
    statusName?: string;
    isOver?: boolean;
    connectDropTarget?: ConnectDropTarget;
}

const listTarget = {
    drop(props: ITodoItemListProps, monitor: DropTargetMonitor) {
        // Bug perhaps from changing target to es6?
        // Had to change from const { id } = monitor.getItem() as ITodoItem
        const i = monitor.getItem() as {item: ITodoItem};
        props.updateTodoStatus(i.item.id, props.status);
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

    private renderList(todos: ITodoItem[]) {
        return todos.map((item: ITodoItem) =>
            <ListItem key={item.id}>
                <TodoItem item={item} onDelete={this.props.deleteTodo.bind(this, item.id)} />
            </ListItem>);
    }
}

// Exporting as React.Component.. is a work around for Typescript issue
// "JSX element attributes type may not be a union type"
export default DropTarget(ItemTypes.TodoItem, listTarget,
    collect)(TodoItemList) as React.ComponentClass<ITodoItemListProps>;
