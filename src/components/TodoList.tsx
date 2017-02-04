import DraggableTodo from './DraggableTodo';
import { ListItem } from 'material-ui/List';
import * as React from 'react';

import { ITodo } from '../models';

interface ITodoListProps {
    todos: ITodo[];
}

class TodoList extends React.Component<ITodoListProps, {}> {
    constructor() {
        super();
    }

    public render() {
        const { todos } = this.props;
        const list = todos.map((item: ITodo) =>
            <ListItem key={item.id} className='todoItemList'>
                <DraggableTodo
                    todo={item}
                />
            </ListItem>
        );
        return (
            <div>{list}</div>
        );
    }
}

export default TodoList;
