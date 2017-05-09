import * as React from 'react';
import { Translate } from 'react-redux-i18n';

import { IUser } from '../../models';
import { updateSelectedUsers } from '../../services/userService';
import { getTokenUsername } from '../../utils/token';

interface IUserProps { isSelected: boolean; user: IUser; }

interface IUserState { selected: boolean; }

class UserComponent extends React.Component<IUserProps, IUserState> {

    constructor() {
        super();

        this.state = {
            selected: false,
        };

        this.toggleSelected = this.toggleSelected.bind(this);
    }

    public componentDidMount() {
        const { user, isSelected } = this.props;
        this.setState({ selected: isSelected });
        updateSelectedUsers(user, isSelected);
    }

    public render() {
        const { user } = this.props;
        let classNames = 'user';
        if (this.state.selected) {
            classNames += ' selectedUser';
        }
        let username: string|JSX.Element = user.username;
        if (user.username === getTokenUsername()) {
            username = <Translate value='users.you' />;
        }
        return (
            <div className={classNames} onClick={this.toggleSelected}>
                {username}
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
