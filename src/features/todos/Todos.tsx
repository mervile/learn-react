import * as React from 'react';

import { Status } from '../../models';
import Header from '../common/Header';
import TodoForm from '../todos/TodoForm';
import { TodoList } from '../todos/todolist/TodoList';
import { I18n } from 'react-redux-i18n';

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
                    <TodoList status={Status.New} title={I18n.t('todos.new')} />
                    <TodoList status={Status.InProgress} title={I18n.t('todos.inProgress')} />
                    <TodoList status={Status.Done} title={I18n.t('todos.done')} />
                </div>
            </div>
        );
    }
}

export default Todos;
