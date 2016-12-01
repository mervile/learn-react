import { connect } from 'react-redux';

import { deleteTodo, updateTodo } from '../actions';
import { IStateTree, ITodo, Status  } from '../models';

import DropTargetList from '../components/DropTargetList';

interface ITodoListContainerProps {
    status: Status;
    title: string;
}

const mapStateToProps = (state: IStateTree, props: ITodoListContainerProps) => {
    return {
        status: props.status,
        title: props.title,
        todos: state.todos.filter(todo => todo.status === props.status),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDelete: (id: number) => {
            dispatch(deleteTodo(id));
        },
        onUpdate: (todo: ITodo) => {
            dispatch(updateTodo(todo));
        },
    };
};

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropTargetList);

export default TodoListContainer;
