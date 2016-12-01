import * as React from 'react';
import FontIcon from 'material-ui/FontIcon';

import { ITodo } from '../models';

import './TodoItem.scss';

interface ITodoProps {
    todo: ITodo;
    onDelete(): void;
}

class Todo extends React.Component<ITodoProps, {}> {
    public render() {
        const { todo, onDelete } = this.props;
        const iconStyles = {
            float: 'right',
            cursor: 'pointer',
        };
        return (
            <div className='todoItem'>
                <span className='description'>{ todo.description }</span>
                <FontIcon
                    className='material-icons'
                    style={iconStyles}
                    onClick={onDelete}
                >
                    delete
                </FontIcon>
            </div>
        );
    }
}

export default Todo;
