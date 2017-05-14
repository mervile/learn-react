import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n, Translate } from 'react-redux-i18n';

import { IProjectWithTodos, IStateTree, IUser } from '../../models';
import { getTokenUsername } from '../../utils/token';
import {
    showModal,
} from '../common/modals/duck';
import {
    isDeletingProject,
    requestDeleteProject,
} from './duck';

import Todos from '../todos/Todos';
import ProjectForm from './ProjectForm';

interface IProjectProps {
    isLoading: boolean;
    project: IProjectWithTodos;
    onDelete(id: string): void;
}

class ProjectComponent extends React.Component<IProjectProps, {}> {
    constructor() {
        super();

        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        const { isLoading, project } = this.props;
        const deleteIcon =
            <FontIcon
                className='material-icons'
                style={{cursor: 'pointer'}}
                onClick={this.onDelete}
            >
                delete
            </FontIcon>;
        let usersList = project.users.filter(user => user.username !== getTokenUsername())
            .map(user => user.username).join(', ');
        usersList = usersList.replace(/,([^,]*)$/, ' ' + I18n.t('common.and') + ' $1');
        let shared = <div><Translate value='projects.notShared' /></div>;
        if (usersList.length > 0) {
            shared = (
                <div>
                    <Translate value='projects.sharedWith' />
                    {usersList}
                </div>
            );
        }

        const actions = isLoading ? <CircularProgress size={20} /> :
            <div className='actions'><ProjectForm project={project} /> <div>{deleteIcon}</div></div>;
        return (
            <div className='project'>
                <div className='project-header'>
                    <h1>{project.project.title}</h1>
                    <div>{ actions }</div>
                </div>
                <h3>{project.project.description}</h3>
                <div> {shared}</div>
                <Todos projectId={project.project.id} />
            </div>
        );
    }

    private onDelete() {
        this.props.onDelete(this.props.project.project.id);
    }
}

interface IProjectComponentProps {
    project: IProjectWithTodos;
}

const mapStateToProps = (state: IStateTree, props: IProjectComponentProps) => {
    return {
        isLoading: isDeletingProject(state),
        project: props.project,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onDelete: (id: string) => {
            // dispatch(requestDeleteProject(id));
            dispatch(showModal({
                callback: requestDeleteProject.bind(this, id),
                description: I18n.t('projects.deleteProject'),
                title: I18n.t('common.confirm'),
            }, 'CONFIRM_MODAL'));
        },
    };
};

const Project = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectComponent);

export default Project;
