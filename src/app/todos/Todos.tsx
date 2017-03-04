import * as React from 'react';

import { Status } from '../../models';
import Header from '../common/Header';
import TodoList from '../todos/todo-list/TodoList';
import TodoForm from '../todos/TodoForm';

class Todos extends React.Component<{}, {}> {
    constructor() {
        super();
    }

    public render() {
        return (
            <div>
                <Header />
                <div className='content'>
                    <TodoForm />
                    <TodoList status={Status.New} title='New' />
                    <TodoList status={Status.InProgress} title='In Progress' />
                    <TodoList status={Status.Done} title='Done' />
                </div>
            </div>
        );
    }
}

export default Todos;
