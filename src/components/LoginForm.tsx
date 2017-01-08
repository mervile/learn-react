import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';

interface ILoginFormState { username: string; password: string; }

/**
 * state tree?:
 * {
 *   loggedIn: boolean,
 *   authorization: string (encoded)
 *   requestStatus: IRequestStatus,
 *   error: IError
 * }
 * 
 * ----------
 * 
 * ILoginFormProps
 * {
 *   loggedIn: boolean,
 *   requestStatus: IRequestStatus,
 *   onLogin(string): void
 *   onLogout(): void
 * }
 */
class LoginForm extends React.Component<{}, ILoginFormState> {
    constructor() {
        super();

        this.state = {
            password: '',
            username: '',
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    public render() {
        return (
            <div className='loginForm'>
                <TextField
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
                />
            </div>
        );
    }

    private handleUsernameChange(event: any) {
        this.setState({ password: this.state.password, username: event.target.value });
    }

    private handlePasswordChange(event: any) {
        this.setState({ password: event.target.value, username: this.state.password });
    }

    private login(event: any) {
        // this.props.onLogin(window.btoa(this.state.username:this.state.password));
    }
}

export default LoginForm;
