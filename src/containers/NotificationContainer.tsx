import { connect } from 'react-redux';

import { IStateTree } from '../models';

import Notification from '../components/Notification';

const mapStateToProps = (state: IStateTree) => {
    return {
        error: state.request.error,
        message: state.request.message,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

const NotificationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);

export default NotificationContainer;
