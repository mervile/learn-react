import * as React from 'react';

import { IUser } from '../../models';
import { updateSelectedUsers } from '../../services/userService';

interface IUserProps { user: IUser; }

interface IUserState { selected: boolean; }

class UserComponent extends React.Component<IUserProps, IUserState> {

    constructor() {
        super();

        this.state = {
            selected: false,
        };

        this.toggleSelected = this.toggleSelected.bind(this);
    }

    public render() {
        const { user } = this.props;
        let classNames = 'user';
        if (this.state.selected) {
            classNames += ' selectedUser';
        }
        return (
            <div className={classNames} onClick={this.toggleSelected}>
                {user.username}
            </div>
        );
    }

    protected toggleSelected(event: any) {
        const { user } = this.props;
        const selected = !this.state.selected;
        this.setState({ selected });
        updateSelectedUsers(user, selected);
    }
}

export default UserComponent;
