import { connect } from 'react-redux';

import {
    REQUEST_LOGIN,
    login,
} from '../actions';
import { ICredentials } from '../models';

import LoginForm from '../components/LoginForm';

const mapStateToProps = (state: any) => {
    return {
        isLoading: state.request.isLoading &&
            (state.request.type === REQUEST_LOGIN),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogin: (creds: ICredentials) => {
            dispatch(login(creds));
        },
    };
};

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
