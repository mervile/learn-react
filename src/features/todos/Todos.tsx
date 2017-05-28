import CircularProgress from 'material-ui/CircularProgress';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import {
    getTodosIfNeeded,
    isGettingTodos,
} from './duck';

import { IStateTree, ITodo, Status } from '../../models';
import TodoForm from '../todos/TodoForm';
import { TodoList } from '../todos/todolist/TodoList';

interface ITodosProps {
    isGettingTodos: boolean;
    projectId: string;
    onInit(): ITodo[];
}

class TodosComponent extends React.Component<ITodosProps, {}> {
    constructor() {
        super();
    }

    public componentDidMount() {
        if (typeof this.props.projectId === 'undefined') {
            this.props.onInit();
        }
    }

    public render() {
        // TODO loading
        const { isGettingTodos, projectId } = this.props;
        return (
            <div>
                <div>
                    <span>{ isGettingTodos ? <CircularProgress size={15} /> : '' }</span>
                    <TodoForm projectId={projectId} />
                    <div className='todoLists'>
                        <TodoList projectId={projectId} status={Status.New} title={I18n.t('todos.new')} />
                        <TodoList projectId={projectId} status={Status.InProgress} title={I18n.t('todos.inProgress')} />
                        <TodoList projectId={projectId} status={Status.Done} title={I18n.t('todos.done')} />
                    </div>
                </div>
            </div>
        );
    }
}

interface ITodosComponentProps {
    projectId: string;
}

const mapStateToProps = (state: IStateTree, props: ITodosComponentProps) => {
    return {
        isGettingTodos: isGettingTodos(state),
        projectId: props.projectId,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onInit: () => {
            dispatch(getTodosIfNeeded());
        },
    };
};

const Todos = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosComponent);

export default Todos;
