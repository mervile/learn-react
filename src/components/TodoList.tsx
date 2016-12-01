import * as React from 'react';
import { List, ListItem } from 'material-ui/List';

import DraggableTodo from './DraggableTodo';
import { ITodo } from '../models';

import './TodoItemList.scss';

interface ITodoListProps {
    todos: ITodo[];
    onDelete(id: number): void;
}

class TodoList extends React.Component<ITodoListProps, {}> {
    constructor() {
        super();
    }

    public render() {
        const { todos, onDelete } = this.props;
        const list = todos.map((item: ITodo) =>
            <ListItem key={item.id} className='todoItemList'>
                <DraggableTodo todo={item} onDelete={onDelete.bind(this, item.id)} />
            </ListItem>
        );
        return (
            <div>{list}</div>
        );
    }
}

export default TodoList;
