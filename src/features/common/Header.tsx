import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';
import { connect } from 'react-redux';

import { IStateTree } from '../../models';
import { logout } from '../auth/duck';

interface IHeaderProps {
    isAuthenticated: boolean;
    username: string;
    onLogout(): void;
}

class HeaderComponent extends React.Component<IHeaderProps, {}> {
    constructor() {
        super();

        this.logout = this.logout.bind(this);
    }

    public render() {
        const { username } = this.props;
        let logout = (
            <div className='logout'>
                <span>Welcome, {username}!</span>
                <RaisedButton
                    type='button'
                    style={{margin:'10px'}}
                    label='Logout'
                    onClick={this.logout}
                />
            </div>
        );
        return <div className='header'><h1>My todos</h1> {logout}</div>;
    }

    private logout() {
        this.props.onLogout();
    }
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        username: state.auth.username,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLogout: () => {
            dispatch(logout());
        },
    };
};

const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent);

export default Header;
