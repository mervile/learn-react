import { ICredentials } from '../models';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';

interface IRegisterFormState {
    username: string;
    password: string;
    // passwordAgain: string
}

interface IRegisterFormProps {
    isLoading: boolean;
    onRegister(creds: ICredentials): void;
}

class RegisterForm extends React.Component<IRegisterFormProps, IRegisterFormState> {
    constructor() {
        super();

        this.state = {
            password: '',
            username: '',
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.register = this.register.bind(this);
    }

    public render() {
        const content = (
            <div className='flex-col'>
                <TextField
                    className='username'
                    type='text'
                    name='username'
                    hintText='Username'
                    onChange={this.handleUsernameChange}
                />
                <TextField
                    type='password'
                    name='password'
                    hintText='Password'
                    onChange={this.handlePasswordChange}
                />
                <RaisedButton
                    type='submit'
                    style={{margin:'10px'}}
                    label='Register'
                    onClick={this.register}
                />
            </div>
        );
        return <div className='register'>{content}</div>;
    }

    private handleUsernameChange(event: any) {
        this.setState({ password: this.state.password, username: event.target.value });
    }

    private handlePasswordChange(event: any) {
        this.setState({ password: event.target.value, username: this.state.username });
    }

    private register(event: any) {
        this.props.onRegister({ password: this.state.password, username: this.state.username });
        this.clearState();
    }

    private clearState() {
        this.setState({ password: '', username: '' });
    }
}

export default RegisterForm;
