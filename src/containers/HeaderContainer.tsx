import { connect } from 'react-redux';

import { logout } from '../actions';
import { IStateTree } from '../models';

import Header from '../components/Header';

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

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderContainer;
