import * as _ from 'lodash';
import Snackbar from 'material-ui/Snackbar';
import * as React from 'react';
import { connect } from 'react-redux';

import { IStateTree } from '../../models';
import { getAuthRequestResult } from '../auth/duck';
import { getTodosRequestResult } from '../todos/duck';

interface INotificationProps {
    error: Response | null;
    message: string;
}

interface INotificationState {
    open: boolean;
}

class NotificationComponent extends React.Component<INotificationProps, INotificationState> {
    constructor() {
        super();
        this.close = this.close.bind(this);
        this.state = {
            open: false,
        };
    }

    public componentWillReceiveProps(nextProps: INotificationProps) {
        const hasMessage = typeof nextProps.message !== 'undefined'
            && nextProps.message.trim().length > 0;
        this.setState({ open: hasMessage });
    }

    public render() {
        const message = this.state.open ? this.props.message : '';
        const bgColor = this.props.error !== null ? 'red' : 'green';
        return (
            <Snackbar
                bodyStyle={{backgroundColor: bgColor}}
                open={this.state.open}
                message={message}
                autoHideDuration={4000}
                onRequestClose={this.close}
            />
        );
    }

    private close() {
        this.setState({ open: false });
    }
}

const mapStateToProps = (state: IStateTree) => {
    // Since request state is feature specific, get all
    // feature request states and check if any have a message
    // from an async request result.
    const reqRes = [
        getAuthRequestResult(state),
        getTodosRequestResult(state),
    ];

    // Working with the assumption there is one request result
    // with message at a time.
    const resultWithMsg = _.find(reqRes, (res) =>
        res.error !== null ||
        typeof res.message !== 'undefined' && res.message.trim().length > 0);

    let error: Response | null = null;
    let message = '';
    if (typeof resultWithMsg !== 'undefined') {
        error = resultWithMsg.error;
        message = resultWithMsg.message;
    }

    return {
        error,
        message,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

const Notification = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationComponent);

export default Notification;
