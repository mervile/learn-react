import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';

import { DELETE_TODO } from '../actions';
import { IRequestState, ITodo } from '../models';

interface ITodoProps {
    todo: ITodo;
    request: IRequestState;
    onDelete(id: number): void;
}

class Todo extends React.Component<ITodoProps, {}> {
    constructor() {
        super();
        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        const { request, todo } = this.props;
        const iconStyles = {
            cursor: 'pointer',
            float: 'right',
        };
        const { id, isLoading, type } = request;
        const isFetching = isLoading && type === DELETE_TODO && id === todo.id;
        const deleteIcon =
            <FontIcon
                className='material-icons'
                style={iconStyles}
                onClick={this.onDelete}
            >
                delete
            </FontIcon>;
        return (
            <div className='todoItem'>
                <span className='description'>{ todo.description }</span>
                { isFetching ? <CircularProgress size={20} style={iconStyles} /> : deleteIcon }
            </div>
        );
    }

    public onDelete() {
        const { onDelete, todo } = this.props;
        onDelete(todo.id);
    }
}

export default Todo;
