import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { IProjectWithTodos, IStateTree, IUser } from '../../models';
import { getSelectedUsers } from '../../services/userService';
import UserSelector from '../users/UserSelector';
import { isAddingProject, requestAddProject, requestUpdateProject } from './duck';

interface IProjectFormProps {
    isLoading: boolean;
    locale: string;
    project: IProjectWithTodos;
    onCreate(event: any, title: string, description: string, users: IUser[]): void;
    onEdit(event: any, pwtu: IProjectWithTodos): void;
}

interface IProjectFormState {
    title: string;
    description: string;
    open: boolean;
}

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

    public componentDidMount() {
        if (this.isEdit()) {
            const { project } = this.props;
            this.setState({
                description: project.project.description,
                open: this.state.open,
                title: project.project.title,
            });
        }
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

        const title = this.isEdit() ? I18n.t('projects.edit') : I18n.t('projects.addNew');
        let button = <RaisedButton label={title} onTouchTap={this.handleOpen} />;
        if (this.isEdit()) {
            button = <FontIcon
                className='material-icons'
                style={{cursor: 'pointer'}}
                onClick={this.handleOpen}
            >
                mode_edit
            </FontIcon>;
        }

        return (
            <div>
                {button}
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    autoDetectWindowHeight={false}
                >
                    <form className='projectForm'>
                        <TextField
                            id='new-project-title'
                            type='text'
                            value={this.state.title}
                            hintText={I18n.t('projects.title')}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id='new-project-description'
                            type='text'
                            value={this.state.description}
                            hintText={I18n.t('projects.description')}
                            onChange={this.handleChange}
                            multiLine={true}
                        />
                        <UserSelector project={this.props.project} />
                    </form>
                </Dialog>
            </div>
        );
    }

    protected submitProject(event: any) {
        const { description, title } = this.state;
        const users = getSelectedUsers();
        if (this.isEdit()) {
            const pwtu = {
                project: {
                    description,
                    id: this.props.project.project.id,
                    title,
                },
                users,
                todos: this.props.project.todos,
            };
            this.props.onEdit(event, pwtu);
        } else {
            this.props.onCreate(event, title, description, users);
        }
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

    private isEdit() {
        return typeof this.props.project !== 'undefined';
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

interface IProjectFormComponentProps {
    project?: IProjectWithTodos;
}

const mapStateToProps = (state: IStateTree, props: IProjectFormComponentProps) => {
    return {
        isLoading: isAddingProject(state),
        locale: state.i18n.locale,
        project: props.project,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onCreate: (event: any, title: string, description: string, users: IUser[]) => {
            event.preventDefault();
            dispatch(requestAddProject(title, description, users));
        },
        onEdit: (event: any, pwtu: IProjectWithTodos) => {
            event.preventDefault();
            dispatch(requestUpdateProject(pwtu));
        },
    };
};

const ProjectForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectFormComponent);

export default ProjectForm;
