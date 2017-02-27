import CircularProgress from 'material-ui/CircularProgress';

import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';

import { REQUEST_TODOS, UPDATE_TODO } from '../actions';
import { IRequestState, ITodo, ItemTypes, Status } from '../models';
import TodoList from './TodoList';

interface IDropTargetListProps {
    request: IRequestState;
    isOver?: boolean;
    title: string;
    todos: ITodo[];
    status: Status;
    connectDropTarget?: ConnectDropTarget;
    onUpdate(todo: ITodo): void;
    onInit(): ITodo[];
}

const listTarget = {
    drop(props: IDropTargetListProps, monitor: DropTargetMonitor) {
        const todo = monitor.getItem().item as ITodo;
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

class DropTargetList extends React.Component<IDropTargetListProps, {}> {
    constructor() {
        super();
    }

    public componentDidMount() {
        this.props.onInit();
    }

    public render() {
        const { request, todos, title, connectDropTarget, isOver} = this.props;
        const isFetching = request.isLoading &&
            (request.type === REQUEST_TODOS || request.type === UPDATE_TODO);

        return connectDropTarget(
            <div style={{backgroundColor: isOver ? 'lightgray' : 'white'}}>
                <h3>
                    <span style={{marginRight:'10px'}}>{title}</span>
                    <span>{ isFetching ? <CircularProgress size={15} /> : '' }</span>
                </h3>
                <TodoList
                    todos={todos}
                />
            </div>
        );
    }
}

// Exporting as React.Component.. is a work around for Typescript issue
// 'JSX element attributes type may not be a union type'
export default DropTarget(ItemTypes.TodoItem, listTarget,
    collect)(DropTargetList) as React.ComponentClass<IDropTargetListProps>;
