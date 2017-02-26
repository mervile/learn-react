import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';

interface IHeaderProps {
    isAuthenticated: boolean;
    username: string;
    onLogout(): void;
}

class Header extends React.Component<IHeaderProps, {}> {
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

export default Header;
