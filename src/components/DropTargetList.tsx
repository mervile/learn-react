import { List, ListItem } from 'material-ui/List';

import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';

import { ITodo, ItemTypes, Status } from '../models';
import TodoList from './TodoList';

interface IDropTargetListProps {
    isOver?: boolean;
    title: string;
    todos: ITodo[];
    status: Status;
    connectDropTarget?: ConnectDropTarget;
    onUpdate(todo: ITodo): void;
    onDelete(id: number): void;
}

const listTarget = {
    drop(props: IDropTargetListProps, monitor: DropTargetMonitor) {
        const item = monitor.getItem().item;
        item.status = props.status;
        props.onUpdate(item);
    },
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

class DropTargetList extends React.Component<IDropTargetListProps, {}> {
    constructor() {
        super();
    }

    public render() {
        const { todos, title, onDelete, connectDropTarget, isOver} = this.props;

        return connectDropTarget(
            <div style={{backgroundColor: isOver ? 'lightgray' : 'white'}}>
                <h3>{title}</h3>
                <TodoList
                    todos={todos}
                    onDelete={onDelete}
                />
            </div>
        );
    }
}

// Exporting as React.Component.. is a work around for Typescript issue
// 'JSX element attributes type may not be a union type'
export default DropTarget(ItemTypes.TodoItem, listTarget,
    collect)(DropTargetList) as React.ComponentClass<IDropTargetListProps>;
