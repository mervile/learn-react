import { ICredentials } from '../models';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';

interface ILoginFormState {
    username: string;
    password: string;
}

interface ILoginFormProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    username: string;
    onLogin(creds: ICredentials): void;
    onLogout(): void;
}

class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
    constructor() {
        super();

        this.state = {
            password: '',
            username: '',
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    public render() {
        const { isAuthenticated, username } = this.props;
        let content = (
            <div className='login'>
                <span>Welcome, {username}!</span>
                <RaisedButton
                    type='button'
                    style={{margin:'10px'}}
                    label='Logout'
                    onClick={this.logout}
                />
            </div>
        );
        if (!isAuthenticated) {
            content = (
                <div className='login'>
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
                        label='Login'
                        onClick={this.login}
                    />
                </div>
            );
        }
        return <div className='header flex-row'><h1>My todos</h1> {content}</div>;
    }

    private handleUsernameChange(event: any) {
        this.setState({ password: this.state.password, username: event.target.value });
    }

    private handlePasswordChange(event: any) {
        this.setState({ password: event.target.value, username: this.state.username });
    }

    private login(event: any) {
        this.props.onLogin({ password: this.state.password, username: this.state.username });
    }

    private logout() {
        this.props.onLogout();
        this.clearState();
    }

    private clearState() {
        this.setState({ password: '', username: '' });
    }
}

export default LoginForm;
