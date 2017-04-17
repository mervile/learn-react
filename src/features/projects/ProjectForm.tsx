import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { IStateTree } from '../../models';
import { isAddingProject, requestAddProject } from './duck';

interface IProjectFormProps {
    isLoading: boolean;
    locale: string;
    onSubmit(event: any, title: string, description: string): void;
}

interface IProjectFormState { title: string; description: string; open: boolean; }

class ProjectFormComponent extends React.Component<IProjectFormProps, IProjectFormState> {

    constructor() {
        super();

        this.state = {
            description: '',
            open: false,
            title: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.submitProject = this.submitProject.bind(this);
    }

    public render() {
        const actions = [
            <FlatButton
                label={I18n.t('common.cancel')}
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.submitProject}
                label={this.props.isLoading ? I18n.t('common.adding') : I18n.t('common.submit')}
                disabled={this.props.isLoading ? true : false}
            />,
        ];

        return (
            <div>
                <RaisedButton label={I18n.t('projects.addNew')} onTouchTap={this.handleOpen} />
                <Dialog
                    title={I18n.t('projects.addNew')}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <form className='projectForm'>
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
                    </form>
                </Dialog>
            </div>
        );
    }

    protected submitProject(event: any) {
        this.props.onSubmit(event, this.state.title, this.state.description);
        this.handleClose();
    }

    protected handleChange(event: any) {
        const { description, open, title } = this.state;
        const target = event.target.id;
        if (target === 'new-project-title') {
            this.setState({ description, open, title: event.target.value });
        } else {
            this.setState({ description: event.target.value, open, title });
        }
    }

    private handleOpen() {
        const { title, description } = this.state;
        this.setState({ description, open: true, title });
    }

    private handleClose() {
        const { title, description } = this.state;
        this.setState({ description, open: false, title });
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
