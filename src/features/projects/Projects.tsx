import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';

import { IProjectWithTodos, IStateTree } from '../../models';
import {
    getProjectsIfNeeded,
    getUserProjects,
    isGettingProjects,
    requestDeleteProject,
} from './duck';

import Project from './Project';
import ProjectForm from './ProjectForm';

interface IProjectsProps {
    isLoading: boolean;
    projects: IProjectWithTodos[];
    onInit(): IProjectWithTodos[];
}

class ProjectsComponent extends React.Component<IProjectsProps, {}> {
    constructor() {
        super();
    }

    public componentDidMount() {
        this.props.onInit();
    }

    public render() {
        const { projects } = this.props;
        const list = projects.map((p: any) =>
            <Project key={p.project.id} project={p.project} users={p.users} />);
        return (
            <div className='content'>
                <ProjectForm />
                <div className='projectList'>
                    {list}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isLoading: isGettingProjects(state),
        projects: getUserProjects(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onInit: () => {
            dispatch(getProjectsIfNeeded());
        },
    };
};

const Projects = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectsComponent);

export default DragDropContext(HTML5Backend)(Projects) as React.ComponentClass<{}>;
