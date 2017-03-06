import Snackbar from 'material-ui/Snackbar';
import * as React from 'react';
import { connect } from 'react-redux';

import { IStateTree } from '../../models';

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
    return {
        error: state.request.error,
        message: state.request.message,
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
