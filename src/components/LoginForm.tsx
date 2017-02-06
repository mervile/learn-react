import { ICredentials } from '../models';
import * as _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';

import { IField, IFormState } from '../models';
import FormTextField from './FormTextField';

interface ILoginFormProps {
    isAuthenticated: boolean;
    isLoading: boolean;
    username: string;
    onLogin(creds: ICredentials): void;
    onLogout(): void;
}

const initState = {
    fields: [
        { isValid: false, name: 'password', value: '' },
        { isValid: false, name: 'username', value: ''},
    ],
    isValid: false,
};

class LoginForm extends React.Component<ILoginFormProps, IFormState> {
    constructor() {
        super();

        this.state = initState;

        this.updateField = this.updateField.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    public render() {
        const { isAuthenticated, username, isLoading } = this.props;
        let content = (
            <div className='login'>
                <span>Welcome, {username}!</span>
                <RaisedButton
                    type='button'
                    style={{margin:'10px'}}
                    label='Logout'
                    icon={ isLoading ? <CircularProgress size={20} /> : ''}
                    onClick={this.logout}
                    disabled={isLoading}
                />
            </div>
        );
        if (!isAuthenticated) {
            content = (
                <div className='login'>
                    <FormTextField
                        type='text'
                        name='username'
                        hintText='Username'
                        onUpdate={this.updateField}
                        isRequired={true}
                    />
                    <FormTextField
                        type='password'
                        name='password'
                        hintText='Password'
                        onUpdate={this.updateField}
                        isRequired={true}
                    />
                    <RaisedButton
                        type='submit'
                        style={{margin:'10px'}}
                        label='Login'
                        icon={ isLoading ? <CircularProgress size={20} /> : ''}
                        onClick={this.login}
                        disabled={!this.state.isValid || isLoading}
                    />
                </div>
            );
        }
        return <div className='header'><h1>My todos</h1> {content}</div>;
    }

    private getStateCopy() {
        return JSON.parse(JSON.stringify(this.state));
    }

    private updateField(field: IField) {
        const fields = this.state.fields.map(f => {
            if (f.name === field.name) {
                return field;
            } else {
                return f;
            }
        });
        this.setState(_.assign(this.getStateCopy(), {
            isValid: _.every(fields, 'isValid'),
            fields,
        }));
    }

    private login() {
        this.props.onLogin({
            password: this.state.fields[0].value,
            username: this.state.fields[1].value });
    }

    private logout() {
        this.props.onLogout();
        this.clearState();
    }

    private clearState() {
        this.setState(initState);
    }
}

export default LoginForm;
