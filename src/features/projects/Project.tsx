import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n, Translate } from 'react-redux-i18n';

import { IProject, IStateTree, IUser } from '../../models';
import { getTokenUsername } from '../../utils/token';
import {
    showModal,
} from '../common/modals/duck';
import {
    isDeletingProject,
    requestDeleteProject,
} from './duck';

import Todos from '../todos/todos';

interface IProjectProps {
    isLoading: boolean;
    project: IProject;
    users: IUser[];
    onDelete(id: string): void;
}

class ProjectComponent extends React.Component<IProjectProps, {}> {
    constructor() {
        super();

        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        const { isLoading, project, users } = this.props;
        const iconStyles = {
            cursor: 'pointer',
            float: 'right',
        };
        const deleteIcon =
            <FontIcon
                className='material-icons'
                style={iconStyles}
                onClick={this.onDelete}
            >
                delete
            </FontIcon>;
        let usersList = users.filter(user => user.username !== getTokenUsername())
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

        return (
            <div className='project'>
                <h1>
                    {project.title}
                    { isLoading ? <CircularProgress size={20} style={iconStyles} /> : deleteIcon }
                </h1>
                <h3>{project.description}</h3>
                <div> {shared}</div>
                <Todos projectId={project.id} />
            </div>
        );
    }

    private onDelete() {
        this.props.onDelete(this.props.project.id);
    }
}

interface IProjectComponentProps {
    project: IProject;
    users: IUser[];
}

const mapStateToProps = (state: IStateTree, props: IProjectComponentProps) => {
    return {
        isLoading: isDeletingProject(state),
        project: props.project,
        users: props.users,
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
