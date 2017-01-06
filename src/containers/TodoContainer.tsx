import { connect } from 'react-redux';

import { requestDeleteTodo } from '../actions';
import { IStateTree, ITodo } from '../models';

import Todo from '../components/Todo';

interface ITodoContainerProps {
    todo: ITodo;
}

const mapStateToProps = (state: IStateTree, props: ITodoContainerProps) => {
    return {
        requestStatus: state.todos.requestStatus,
        todo: props.todo,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDelete: (id: number) => {
            dispatch(requestDeleteTodo(id));
        },
    };
};

const TodoContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Todo);

export default TodoContainer;
