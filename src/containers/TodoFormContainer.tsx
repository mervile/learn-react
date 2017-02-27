import { connect } from 'react-redux';

import { ADD_TODO, requestAddTodo } from '../actions';

import TodoForm from '../components/TodoForm';

const mapStateToProps = (state: any) => {
    return {
        isLoading: state.request.isLoading && state.request.type === ADD_TODO,
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
