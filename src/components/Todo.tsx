import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';

import { ITodo } from '../models';

import './Todo.scss';

interface ITodoProps {
    todo: ITodo;
    onDelete(): void;
}

class Todo extends React.Component<ITodoProps, {}> {
    public render() {
        const { todo, onDelete } = this.props;
        const iconStyles = {
            cursor: 'pointer',
            float: 'right',
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
