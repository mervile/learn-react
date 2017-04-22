import CircularProgress from 'material-ui/CircularProgress';
import * as React from 'react';
import { connect } from 'react-redux';
import { Translate } from 'react-redux-i18n';

import { IStateTree, IUser } from '../../models';
import { getTokenUsername } from '../../utils/token';
import { getAllUsers, getUsersIfNeeded, isGettingUsers } from './duck';
import User from './User';

interface IUserSelectorProps {
    isLoading: boolean;
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
        const { users, isLoading } = this.props;
        const usersList = users.filter(user => user.username !== getTokenUsername())
            .map(user => <User key={user.id} user={user} />);
        return (
            <div>
                <h4><Translate value='users.select' /></h4>
                <div>{ isLoading ? <CircularProgress size={15} /> : '' }</div>
                <div className='userList'>{ usersList }</div>
            </div>
        );
    }
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isLoading: isGettingUsers(state),
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
