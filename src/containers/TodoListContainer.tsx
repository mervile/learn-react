import { connect } from 'react-redux';

import {
    getTodosIfNeeded,
    requestDeleteTodo,
    requestUpdateTodo,
} from '../actions';
import { IStateTree, ITodo, Status  } from '../models';

import DropTargetList from '../components/DropTargetList';

interface ITodoListContainerProps {
    status: Status;
    title: string;
}

const mapStateToProps = (state: IStateTree, props: ITodoListContainerProps) => {
    return {
        requestStatus: state.todos.requestStatus,
        status: props.status,
        title: props.title,
        todos: state.todos.items.filter(todo => todo.status === props.status),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDelete: (id: number) => {
            dispatch(requestDeleteTodo(id));
        },
        onInit: () => {
            dispatch(getTodosIfNeeded());
        },
        onUpdate: (todo: ITodo) => {
            dispatch(requestUpdateTodo(todo));
        },
    };
};

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropTargetList);

export default TodoListContainer;
