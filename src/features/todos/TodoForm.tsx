import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { connect } from 'react-redux';

import { isAddingTodo, requestAddTodo } from './duck';

interface ITodoFormProps {
    isLoading: boolean;
    onSubmit(event: any, value: string): void;
}
interface ITodoFormState { value: string; }

class TodoFormComponent extends React.Component<ITodoFormProps, ITodoFormState> {

    constructor() {
        super();

        this.state = {
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitTodo = this.submitTodo.bind(this);
    }

    public render() {
        return (
            <form className='todoForm'>
                <TextField
                    type='text'
                    hintText='Add new todo!'
                    onChange={this.handleChange}
                />
                <RaisedButton
                    type='submit'
                    style={{margin:'10px'}}
                    onClick={this.submitTodo}
                    label={this.props.isLoading ? 'Adding...' : 'Submit'}
                    disabled={this.props.isLoading ? true : false}
                />
            </form>
        );
    }

    protected submitTodo(event: any) {
        this.props.onSubmit(event, this.state.value);
    }

    protected handleChange(event: any) {
        this.setState({ value: event.target.value });
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoading: isAddingTodo(state),
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

const TodoForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoFormComponent);

export default TodoForm;
