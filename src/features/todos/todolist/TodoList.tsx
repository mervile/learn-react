import CircularProgress from 'material-ui/CircularProgress';
import { ListItem } from 'material-ui/List';
import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import { connect } from 'react-redux';

import {
    getTodosByStatus,
    isUpdatingTodo,
    requestUpdateTodo,
} from '../duck';

import { IStateTree, ITodo, ItemTypes, Status  } from '../../../models';
import DraggableTodo from './todo/DraggableTodo';

interface IDropTargetListProps {
    isUpdatingTodo: boolean;
    isOver?: boolean;
    title: string;
    todos: ITodo[];
    status: Status;
    connectDropTarget?: ConnectDropTarget;
    onUpdate(todo: ITodo): void;
}

const listTarget = {
    drop(props: IDropTargetListProps, monitor: DropTargetMonitor) {
        const todo = monitor.getItem() as ITodo;
        todo.status = props.status;
        props.onUpdate(todo);
    },
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

class TodoListComponent extends React.Component<IDropTargetListProps, {}> {
    constructor() {
        super();
    }

    public render() {
        const { isUpdatingTodo, todos, title, connectDropTarget, isOver} = this.props;
        const list = todos.map((item: ITodo) =>
            <ListItem key={item.id} className='todoListItem'>
                <DraggableTodo
                    todo={item}
                />
            </ListItem>
        );

        return connectDropTarget(
            <div className='todoList' style={{backgroundColor: isOver ? 'lightgray' : ''}}>
                <h3>
                    <span style={{marginRight:'10px'}}>{title}</span>
                    <span>{ isUpdatingTodo ? <CircularProgress size={15} /> : '' }</span>
                </h3>
                {list}
            </div>
        );
    }
}

interface ITodoListContainerProps {
    status: Status;
    title: string;
    projectId: string;
}

const mapStateToProps = (state: IStateTree, props: ITodoListContainerProps) => {
    return {
        isUpdatingTodo: isUpdatingTodo(state),
        status: props.status,
        title: props.title,
        todos: getTodosByStatus(state, props),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onUpdate: (todo: ITodo) => {
            dispatch(requestUpdateTodo(todo));
        },
    };
};

const DropTargetList = DropTarget(ItemTypes.TodoItem,
    listTarget, collect)(TodoListComponent);

const TodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropTargetList);

export { TodoList, DropTargetList, IDropTargetListProps };
