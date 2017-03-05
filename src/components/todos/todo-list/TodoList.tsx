import CircularProgress from 'material-ui/CircularProgress';
import { ListItem } from 'material-ui/List';
import * as React from 'react';
import { ConnectDropTarget, DropTarget, DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import { connect } from 'react-redux';

import {
    getTodosIfNeeded,
    requestUpdateTodo,
} from '../../../data/actions';
import { TODOS_REQUEST, UPDATE_TODO_REQUEST } from '../../../data/actions';
import { IRequestState, IStateTree, ITodo, ItemTypes, Status  } from '../../../models';
import DraggableTodo from './todo/DraggableTodo';

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

    public componentDidMount() {
        this.props.onInit();
    }

    public render() {
        const { request, todos, title, connectDropTarget, isOver} = this.props;
        const isFetching = request.isLoading &&
            (request.type === TODOS_REQUEST || request.type === UPDATE_TODO_REQUEST);
        const list = todos.map((item: ITodo) =>
            <ListItem key={item.id} className='todoItemList'>
                <DraggableTodo
                    todo={item}
                />
            </ListItem>
        );

        return connectDropTarget(
            <div style={{backgroundColor: isOver ? 'lightgray' : 'white'}}>
                <h3>
                    <span style={{marginRight:'10px'}}>{title}</span>
                    <span>{ isFetching ? <CircularProgress size={15} /> : '' }</span>
                </h3>
                {list}
            </div>
        );
    }
}

interface ITodoListContainerProps {
    status: Status;
    title: string;
}

const mapStateToProps = (state: IStateTree, props: ITodoListContainerProps) => {
    return {
        request: state.request,
        status: props.status,
        title: props.title,
        todos: state.todos.items.filter(todo => todo.status === props.status),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onInit: () => {
            dispatch(getTodosIfNeeded());
        },
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
