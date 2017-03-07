import * as React from 'react';

import { Status } from '../../models';
import Header from '../common/Header';
import TodoForm from '../todos/TodoForm';
import { TodoList } from '../todos/todolist/TodoList';

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
