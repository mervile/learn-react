import { ICredentials } from '../models';
import * as _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';
import { Link } from 'react-router';

import { PATHS } from '../config';
import { IField, IFormState } from '../models';
import { validateUsername } from '../services/authService';
import FormTextField from './FormTextField';

interface IRegisterFormProps {
    isLoading: boolean;
    message: string;
    onRegister(creds: ICredentials): void;
}

const initState = {
    fields: [
        { isValid: false, name: 'password', value: '' },
        { isValid: false, name: 'passwordAgain', value: '' },
        { isValid: false, name: 'username', value: '' },
    ],
    isValid: false,
};

class RegisterForm extends React.Component<IRegisterFormProps, IFormState> {

    constructor() {
        super();
        this.state = initState;

        this.register = this.register.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    public render() {
        const { isLoading, message } = this.props;
        const pass1Validator = {
            errorText: 'Passwords length must be at least 3 characters!',
            validate: (val: string) => val.length >= 3,
        };
        const pass2Validator = {
            errorText: 'Passwords must match!',
            validate: (val: string) => val === this.state.fields[0].value,
        };
        const usernameValidator = {
            errorText: 'Username is already taken!',
            validate: (val: string) => validateUsername(val),
        };

        let helpText = 'Already have an account?';
        if (message.trim().length > 0) {
            helpText = message;
        }

        const content = (
            <div className='register'>
                <h1>Create new account</h1>
                <FormTextField
                    type='text'
                    name='username'
                    hintText='Username'
                    isRequired={true}
                    asyncValidator={usernameValidator}
                    onUpdate={this.updateField}
                />
                <FormTextField
                    type='password'
                    name='password'
                    hintText='Password'
                    isRequired={true}
                    validator={pass1Validator}
                    onUpdate={this.updateField}
                />
                <FormTextField
                    type='password'
                    name='passwordAgain'
                    hintText='Password again'
                    isRequired={true}
                    validator={pass2Validator}
                    onUpdate={this.updateField}
                />
                <RaisedButton
                    type='submit'
                    style={{margin:'10px'}}
                    label='Register'
                    icon={ isLoading ? <CircularProgress size={20} /> : ''}
                    onClick={this.register}
                    disabled={!this.state.isValid || isLoading}
                />
                <div>
                    <div>{helpText}</div>
                    <Link to={PATHS.LOGIN}>Login here</Link>
                </div>
            </div>
        );
        return <div>{content}</div>;
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

    private register(event: any) {
        this.props.onRegister({
            password: this.state.fields[0].value,
            username: this.state.fields[2].value });
    }
}

export default RegisterForm;
