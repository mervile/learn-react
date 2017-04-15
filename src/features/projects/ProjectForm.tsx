import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n, Translate } from 'react-redux-i18n';

import { IStateTree } from '../../models';
import { isAddingProject, requestAddProject } from './duck';

interface IProjectFormProps {
    isLoading: boolean;
    locale: string;
    onSubmit(event: any, title: string, description: string): void;
}

interface IProjectFormState { title: string; description: string; }

class ProjectFormComponent extends React.Component<IProjectFormProps, IProjectFormState> {

    constructor() {
        super();

        this.state = {
            description: '',
            title: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitProject = this.submitProject.bind(this);
    }

    public render() {
        return (
            <form className='projectForm'>
                <h3><Translate value='projects.addNew'/></h3>
                <TextField
                    id='new-project-title'
                    type='text'
                    hintText={I18n.t('projects.title')}
                    onChange={this.handleChange}
                />
                <TextField
                    id='new-project-description'
                    type='text'
                    hintText={I18n.t('projects.description')}
                    onChange={this.handleChange}
                    multiLine={true}
                />
                <RaisedButton
                    type='submit'
                    style={{margin:'10px'}}
                    onClick={this.submitProject}
                    label={this.props.isLoading ? I18n.t('common.adding') : I18n.t('common.submit')}
                    disabled={this.props.isLoading ? true : false}
                />
            </form>
        );
    }

    protected submitProject(event: any) {
        this.props.onSubmit(event, this.state.title, this.state.description);
    }

    protected handleChange(event: any) {
        const target = event.target.id;
        if (target === 'new-project-title') {
            this.setState({ description: this.state.description, title: event.target.value });
        } else {
            this.setState({ description: event.target.value, title: this.state.title });
        }
    }
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isLoading: isAddingProject(state),
        locale: state.i18n.locale,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: (event: any, title: string, description: string) => {
            event.preventDefault();
            dispatch(requestAddProject(title, description));
        },
    };
};

const ProjectForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectFormComponent);

export default ProjectForm;
