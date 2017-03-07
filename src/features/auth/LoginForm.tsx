import * as _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { PATHS } from '../../config';
import { ICredentials, IField, IFormState, IStateTree } from '../../models';
import FormTextField from '../common/FormTextField';

import { isLoggingIn, login } from './duck';

interface ILoginFormProps {
    isLoading: boolean;
    onLogin(creds: ICredentials): void;
}

const initState = {
    fields: [
        { isValid: false, name: 'password', value: '' },
        { isValid: false, name: 'username', value: ''},
    ],
    isValid: false,
};

class LoginFormComponent extends React.Component<ILoginFormProps, IFormState> {
    constructor() {
        super();

        this.state = initState;

        this.updateField = this.updateField.bind(this);
        this.login = this.login.bind(this);
    }

    public render() {
        const { isLoading } = this.props;
        return (
            <div className='login'>
                <h1>login</h1>
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
                <div>
                    <div>Don't have an account yet?</div>
                    <Link to={PATHS.REGISTER}>Register here</Link>
                </div>
            </div>
        );
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
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isLoading: isLoggingIn(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogin: (creds: ICredentials) => {
            dispatch(login(creds));
        },
    };
};

const LoginForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormComponent);

export default LoginForm;
