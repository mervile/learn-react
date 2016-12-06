import DraggableTodo from './DraggableTodo';
import { ListItem } from 'material-ui/List';
import * as React from 'react';

import { IRequestStatus, ITodo } from '../models';

import './TodoList.scss';

interface ITodoListProps {
    todos: ITodo[];
    requestStatus: IRequestStatus;
    onDelete(id: number): void;
}

class TodoList extends React.Component<ITodoListProps, {}> {
    constructor() {
        super();
    }

    public render() {
        const { requestStatus, todos, onDelete } = this.props;
        const list = todos.map((item: ITodo) =>
            <ListItem key={item.id} className='todoItemList'>
                <DraggableTodo
                    todo={item}
                    onDelete={onDelete.bind(this, item.id)}
                    requestStatus={requestStatus}
                />
            </ListItem>
        );
        return (
            <div>{list}</div>
        );
    }
}

export default TodoList;
