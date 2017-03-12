import * as _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n, Translate } from 'react-redux-i18n';
import { Link } from 'react-router';

import { PATHS } from '../../config';
import { ICredentials, IField, IFormState } from '../../models';
import { validateUsername } from '../../services/authService';
import FormTextField from '../common/FormTextField';
import { getRegistrationMessage, isRegistering, register } from './duck';

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

class RegisterFormComponent extends React.Component<IRegisterFormProps, IFormState> {

    constructor() {
        super();
        this.state = initState;

        this.register = this.register.bind(this);
        this.updateField = this.updateField.bind(this);
    }

    public render() {
        const { isLoading, message } = this.props;
        const pass1Validator = {
            errorText: I18n.t('auth.passwordLength'),
            validate: (val: string) => val.length >= 3,
        };
        const pass2Validator = {
            errorText: I18n.t('auth.passwordMatch'),
            validate: (val: string) => val === this.state.fields[0].value,
        };
        const usernameValidator = {
            errorText: I18n.t('auth.usernameTaken'),
            validate: (val: string) => validateUsername(val),
        };

        let helpText = I18n.t('auth.accountAlready');
        if (message.trim().length > 0) {
            helpText = message;
        }

        const content = (
            <div className='register'>
                <h1><Translate value='auth.createAccount' /></h1>
                <FormTextField
                    type='text'
                    name='username'
                    hintText={I18n.t('auth.username')}
                    isRequired={true}
                    asyncValidator={usernameValidator}
                    onUpdate={this.updateField}
                />
                <FormTextField
                    type='password'
                    name='password'
                    hintText={I18n.t('auth.password')}
                    isRequired={true}
                    validator={pass1Validator}
                    onUpdate={this.updateField}
                />
                <FormTextField
                    type='password'
                    name='passwordAgain'
                    hintText={I18n.t('auth.passwordAgain')}
                    isRequired={true}
                    validator={pass2Validator}
                    onUpdate={this.updateField}
                />
                <RaisedButton
                    type='submit'
                    style={{margin:'10px'}}
                    label={I18n.t('auth.register')}
                    icon={ isLoading ? <CircularProgress size={20} /> : ''}
                    onClick={this.register}
                    disabled={!this.state.isValid || isLoading}
                />
                <div>
                    <div>{helpText}</div>
                    <Link to={PATHS.LOGIN}><Translate value='auth.loginHere' /></Link>
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

const mapStateToProps = (state: any) => {
    return {
        isLoading: isRegistering(state),
        message: getRegistrationMessage(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onRegister: (creds: ICredentials) => {
            dispatch(register(creds));
        },
    };
};

const RegistrationForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterFormComponent);

export default RegistrationForm;
