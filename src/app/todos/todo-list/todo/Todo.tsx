import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import { connect } from 'react-redux';

import { DELETE_TODO_REQUEST, requestDeleteTodo } from '../../../../data/actions';
import { IRequestState, IStateTree, ITodo } from '../../../../models';

interface ITodoProps {
    todo: ITodo;
    request: IRequestState;
    onDelete(id: number): void;
}

class TodoComponent extends React.Component<ITodoProps, {}> {
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
        const isFetching = isLoading && type === DELETE_TODO_REQUEST && id === todo.id;
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
        request: state.request,
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
