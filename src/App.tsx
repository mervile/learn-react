import * as React from 'react';
import { Route, Router, browserHistory } from 'react-router';

import { PATHS, TOKEN } from './config';
import { IStateTree } from './models';

import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import ModalRoot from './features/common/modals/ModalRoot';
import Notification from './features/common/Notification';
import Main from './features/main/Main';

import { connect } from 'react-redux';

interface IAppProps {
    isAuthenticated: boolean;
    locale: string;
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        locale: state.i18n.locale,
    };
};

class AppComponent extends React.Component<IAppProps, {}> {
    public constructor() {
        super();

        this.requireAuth = this.requireAuth.bind(this);
        this.checkAuth = this.checkAuth.bind(this);
    }

    public render() {
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path={PATHS.LOGIN} component={LoginForm} onEnter={this.checkAuth} />
                    <Route path={PATHS.REGISTER} component={RegisterForm} onEnter={this.checkAuth} />
                    <Route path={PATHS.HOME} component={Main} onEnter={this.requireAuth} />
                </Router>
                <Notification />
                <ModalRoot />
            </div>
        );
    }

    /**
     * Redirect to authenticated content if user is logged in.
     */
    private checkAuth(nextState: any, replace: any) {
        if (localStorage.getItem(TOKEN)) {
            replace(PATHS.HOME);
        }
    }

    /**
     * Redirect to login if user is not logged in.
     */
    private requireAuth(nextState: any, replace: any) {
        if (!localStorage.getItem(TOKEN)) {
            replace(PATHS.LOGIN);
        }
    }
};

const App = connect(mapStateToProps)(AppComponent);

export default App;
