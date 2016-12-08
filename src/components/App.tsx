import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Status } from '../models';

import ErrorContainer from '../containers/ErrorContainer';
import TodoForm from '../containers/TodoFormContainer';
import TodoListContainer from '../containers/TodoListContainer';

class App extends React.Component<{}, {}> {
    constructor() {
        super();
    }

    public render() {
        return (
            <div>
                <TodoForm />
                <TodoListContainer status={Status.New} title='New' />
                <TodoListContainer status={Status.InProgress} title='In Progress' />
                <TodoListContainer status={Status.Done} title='Done' />
                <ErrorContainer />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App) as React.ComponentClass<{}>;
