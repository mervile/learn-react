import * as React from 'react';

import HeaderContainer from '../containers/HeaderContainer';
import TodoFormContainer from '../containers/TodoFormContainer';
import TodoListContainer from '../containers/TodoListContainer';
import { Status } from '../models';

class Todos extends React.Component<{}, {}> {
    constructor() {
        super();
    }

    public render() {
        return (
            <div>
                <HeaderContainer />
                <div className='content'>
                    <TodoFormContainer />
                    <TodoListContainer status={Status.New} title='New' />
                    <TodoListContainer status={Status.InProgress} title='In Progress' />
                    <TodoListContainer status={Status.Done} title='Done' />
                </div>
            </div>
        );
    }
}

export default Todos;
