import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { IStateTree, Status } from '../models';

import ErrorContainer from '../containers/ErrorContainer';
import LoginFormContainer from '../containers/LoginFormContainer';
import RegisterFormContainer from '../containers/RegisterFormContainer';
import TodoFormContainer from '../containers/TodoFormContainer';
import TodoListContainer from '../containers/TodoListContainer';

import { connect } from 'react-redux';

interface IAppProps {
    isAuthenticated: boolean;
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const App = (props: IAppProps) => {
    let authContent = (
        <div className='content'>
            Login to see todos. Don't have an account? Register here:
            <RegisterFormContainer />
        </div>
    );
    if (props.isAuthenticated) {
        authContent = (
            <div className='content'>
                <TodoFormContainer />
                <TodoListContainer status={Status.New} title='New' />
                <TodoListContainer status={Status.InProgress} title='In Progress' />
                <TodoListContainer status={Status.Done} title='Done' />
            </div>
        );
    }
    return (
        <div>
            <LoginFormContainer />
            {authContent}
            <ErrorContainer />
        </div>
    );
};

const AppContainer = connect(mapStateToProps)(App);

export default DragDropContext(HTML5Backend)(AppContainer) as React.ComponentClass<{}>;
