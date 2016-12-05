import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import * as React from 'react';

interface ITodoFormProps {
    hasError: boolean;
    isLoading: boolean;
    onSubmit(event: any, value: string): void;
}
interface ITodoFormState { value: string; }

class TodoForm extends React.Component<ITodoFormProps, ITodoFormState> {

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
                    hintText='Add new todo'
                    onChange={this.handleChange}
                />
                <RaisedButton
                    type='submit'
                    style={{margin:'10px'}}
                    onClick={this.submitTodo}
                    label={this.props.isLoading ? 'Adding...' : 'Submit'}
                    disabled={this.props.isLoading ? true : false}
                />
                <Snackbar
                    open={this.props.hasError}
                    message='Failed to add new todo item!'
                    autoHideDuration={4000}
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

export default TodoForm;
