import { connect } from 'react-redux';

import {
    REQUEST_REGISTRATION,
    register,
} from '../actions';
import { ICredentials } from '../models';

import RegisterForm from '../components/RegisterForm';

const mapStateToProps = (state: any) => {
    return {
        isLoading: state.auth.requestStatus.isLoading &&
            (state.auth.requestStatus.type === REQUEST_REGISTRATION),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onRegister: (creds: ICredentials) => {
            dispatch(register(creds));
        },
    };
};

const RegistrationFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);

export default RegistrationFormContainer;
