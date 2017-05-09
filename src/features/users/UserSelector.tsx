import * as _ from 'lodash';
import CircularProgress from 'material-ui/CircularProgress';
import * as React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';

import { IProjectWithTodos, IStateTree, IUser } from '../../models';
import { getAllUsers, getUsersIfNeeded, isGettingUsers } from './duck';
import User from './User';

interface IUserSelectorProps {
    isLoading: boolean;
    selectedUsers: IUser[];
    users: IUser[];
    onInit(): IUser[];
}

class UserSelectorComponent extends React.Component<IUserSelectorProps, {}> {

    constructor() {
        super();
    }

    public componentDidMount() {
        this.props.onInit();
    }

    public render() {
        const { users, isLoading, selectedUsers } = this.props;
        const usersList = users.map(user => {
            const isSelected = _.findIndex(selectedUsers, u => u.id === user.id) !== -1;
            return <User key={user.id} user={user} isSelected={isSelected} />;
        });
        return (
            <div>
                <h4><Translate value='users.select' /></h4>
                <div>{ isLoading ? <CircularProgress size={15} /> : '' }</div>
                <div className='userList'>{ usersList }</div>
            </div>
        );
    }
}

interface IUserSelectorComponentProps {
    project?: IProjectWithTodos;
}

const mapStateToProps = (state: IStateTree, props: IUserSelectorComponentProps) => {
    return {
        isLoading: isGettingUsers(state),
        selectedUsers: typeof props.project !== 'undefined' ? props.project.users : [],
        users: getAllUsers(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onInit: () => {
            dispatch(getUsersIfNeeded());
        },
    };
};

const UserSelector = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserSelectorComponent);

export default UserSelector;
