import RaisedButton from 'material-ui/RaisedButton';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n, Translate } from 'react-redux-i18n';

import { IStateTree } from '../../models';
import { logout } from '../auth/duck';
import Locales from './localeselection';

interface IHeaderProps {
    isAuthenticated: boolean;
    username: string;
    locale: string;
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
                <span><Translate value='common.welcome' username={username} /></span>
                <RaisedButton
                    type='button'
                    style={{margin:'10px'}}
                    label={I18n.t('common.logout')}
                    onClick={this.logout}
                />
            </div>
        );
        return (
            <div className='header'>
                <h1><Translate value='common.myTodos' /></h1>
                <Locales />
                {logout}
            </div>
        );
    }

    private logout() {
        this.props.onLogout();
    }
}

const mapStateToProps = (state: IStateTree) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        locale: state.i18n.locale,
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
