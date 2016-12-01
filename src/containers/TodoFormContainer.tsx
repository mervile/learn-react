import { connect } from 'react-redux';

import { addTodo } from '../actions';

import TodoForm from '../components/TodoForm';

const mapStateToProps = (state: any) => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (event: any, value: string) => {
            event.preventDefault();
            dispatch(addTodo(value));
        },
    };
};

const TodoFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoForm);

export default TodoFormContainer;
