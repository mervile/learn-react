import { connect } from 'react-redux';

import { ADD_TODO_FAILURE, requestAddTodo } from '../actions';

import TodoForm from '../components/TodoForm';

const mapStateToProps = (state: any) => {
    return {
        hasError: state.todos.error !== null && state.todos.error.type === ADD_TODO_FAILURE,
        isLoading: state.todos.isFetching,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (event: any, value: string) => {
            event.preventDefault();
            dispatch(requestAddTodo(value));
        },
    };
};

const TodoFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoForm);

export default TodoFormContainer;
