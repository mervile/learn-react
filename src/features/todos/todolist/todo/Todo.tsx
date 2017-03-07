import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import { connect } from 'react-redux';

import { IStateTree, ITodo } from '../../../../models';
import { isDeletingTodo, requestDeleteTodo } from '../../duck';

interface ITodoProps {
    todo: ITodo;
    isDeletingTodo: boolean;
    onDelete(id: number): void;
}

class TodoComponent extends React.Component<ITodoProps, {}> {
    constructor() {
        super();
        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        const { isDeletingTodo, todo } = this.props;
        const iconStyles = {
            cursor: 'pointer',
            float: 'right',
        };
        const isFetching = isDeletingTodo;
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

interface ITodoContainerProps {
    todo: ITodo;
}

const mapStateToProps = (state: IStateTree, props: ITodoContainerProps) => {
    return {
        isDeletingTodo: isDeletingTodo(state, props),
        todo: props.todo,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDelete: (id: number) => {
            dispatch(requestDeleteTodo(id));
        },
    };
};

const Todo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoComponent);

export default Todo;
