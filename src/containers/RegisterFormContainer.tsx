import { connect } from 'react-redux';

import {
    REQUEST_REGISTRATION,
    register,
} from '../actions';
import { ICredentials } from '../models';

import RegisterForm from '../components/RegisterForm';

const mapStateToProps = (state: any) => {
    return {
        isLoading: state.request.isLoading &&
            (state.request.type === REQUEST_REGISTRATION),
        message: state.request.message,
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
