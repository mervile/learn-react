import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';

import { ITodo, ItemTypes } from '../../../../models';
import Todo from './Todo';

interface IDraggableTodoProps {
    todo: ITodo;
    connectDragSource?: any;
    isDragging?: boolean;
}

const todoItemSource = {
    beginDrag(props: IDraggableTodoProps) {
        return props.todo;
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
        const { todo, connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div style={{opacity: isDragging ? 0.5 : 1}}>
                <Todo todo={todo} />
            </div>
        );
    }
}

// Exporting as React.Component.. is a work around for Typescript issue
// 'JSX element attributes type may not be a union type'
export default DragSource(ItemTypes.TodoItem, todoItemSource,
    collect)(DraggableTodo) as React.ComponentClass<IDraggableTodoProps>;
