import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import { connect } from 'react-redux';

import { IProject, IStateTree } from '../../models';
import {
    isDeletingProject,
    requestDeleteProject,
} from './duck';

import Todos from '../todos/todos';

interface IProjectProps {
    isLoading: boolean;
    project: IProject;
    onDelete(id: string): void;
}

class ProjectComponent extends React.Component<IProjectProps, {}> {
    constructor() {
        super();

        this.onDelete = this.onDelete.bind(this);
    }

    public render() {
        const { isLoading, project } = this.props;
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

        return (
            <div className='project'>
                <h1>
                    {project.title}
                    { isLoading ? <CircularProgress size={20} style={iconStyles} /> : deleteIcon }
                </h1>
                <h3>{project.description}</h3>
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
            dispatch(requestDeleteProject(id));
        },
    };
};

const Project = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectComponent);

export default Project;
