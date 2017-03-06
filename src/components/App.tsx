import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Router, browserHistory } from 'react-router';

import { PATHS, TOKEN } from '../config';
import { IStateTree } from '../models';

import Notification from './common/Notification';
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import Todos from './todos/Todos';

import { connect } from 'react-redux';

interface IAppProps {
    isAuthenticated: boolean;
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
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
                    <Route path={PATHS.HOME} component={Todos} onEnter={this.requireAuth} />
                </Router>
                <Notification />
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

export default DragDropContext(HTML5Backend)(App) as React.ComponentClass<{}>;
