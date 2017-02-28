import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Route, Router, browserHistory } from 'react-router';

import { PATHS, TOKEN } from '../config';
import { IStateTree } from '../models';

import LoginFormContainer from '../containers/LoginFormContainer';
import NotificationContainer from '../containers/NotificationContainer';
import RegisterFormContainer from '../containers/RegisterFormContainer';
import TodosContainer from './Todos';

import { connect } from 'react-redux';

interface IAppProps {
    isAuthenticated: boolean;
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

class App extends React.Component<IAppProps, {}> {
    public constructor() {
        super();

        this.requireAuth = this.requireAuth.bind(this);
        this.checkAuth = this.checkAuth.bind(this);
    }

    public render() {
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path={PATHS.LOGIN} component={LoginFormContainer} onEnter={this.checkAuth} />
                    <Route path={PATHS.REGISTER} component={RegisterFormContainer} onEnter={this.checkAuth} />
                    <Route path={PATHS.HOME} component={TodosContainer} onEnter={this.requireAuth} />
                </Router>
                <NotificationContainer />
            </div>
        );
    }

    /**
     * Redirect to authenticated content if user is logged in.
     */
    private checkAuth(nextState: any, replace: any) {
        // TODO Ask server if token is valid
        if (localStorage.getItem(TOKEN)) {
            replace(PATHS.HOME);
        }
    }

    /**
     * Redirect to login if user is not logged in.
     */
    private requireAuth(nextState: any, replace: any) {
        // TODO Ask server if token is valid
        if (!localStorage.getItem(TOKEN)) {
            replace(PATHS.LOGIN);
        }
    }
};

const AppContainer = connect(mapStateToProps)(App);

export default DragDropContext(HTML5Backend)(AppContainer) as React.ComponentClass<{}>;
