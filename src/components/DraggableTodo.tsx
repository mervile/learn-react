import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';

import Todo from '../components/Todo';
import { IRequestStatus, ITodo, ItemTypes } from '../models';

interface IDraggableTodoProps {
    todo: ITodo;
    onDelete: any;
    requestStatus: IRequestStatus;
    connectDragSource?: any;
    isDragging?: boolean;
}

const todoItemSource = {
    beginDrag(props: IDraggableTodoProps) {
        return { item: props.todo };
    },
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class DraggableTodo extends React.Component<IDraggableTodoProps, {}> {
    public render() {
        const { requestStatus, todo, onDelete, connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div style={{opacity: isDragging ? 0.5 : 1}}>
                <Todo requestStatus={requestStatus} todo={todo} onDelete={onDelete} />
            </div>
        );
    }
}

// Exporting as React.Component.. is a work around for Typescript issue
// 'JSX element attributes type may not be a union type'
export default DragSource(ItemTypes.TodoItem, todoItemSource,
    collect)(DraggableTodo) as React.ComponentClass<IDraggableTodoProps>;
