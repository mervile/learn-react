import { connect } from 'react-redux';

import {
    REQUEST_LOGIN,
    login,
    logout,
} from '../actions';
import { ICredentials } from '../models';

import LoginForm from '../components/LoginForm';

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.todos.requestStatus.isLoading &&
            (state.todos.requestStatus.type === REQUEST_LOGIN),
        username: state.auth.username,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogin: (creds: ICredentials) => {
            dispatch(login(creds));
        },
        onLogout: () => {
            dispatch(logout());
        },
    };
};

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
