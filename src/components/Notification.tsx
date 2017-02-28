import * as React from 'react';

import Snackbar from 'material-ui/Snackbar';

interface INotificationProps {
    error: Response | null;
    message: string;
}

interface INotificationState {
    open: boolean;
}

class Notification extends React.Component<INotificationProps, INotificationState> {
    constructor() {
        super();
        this.close = this.close.bind(this);
        this.state = {
            open: false,
        };
    }

    public componentWillReceiveProps(nextProps: INotificationProps) {
        const hasMessage = nextProps.message && nextProps.message.trim().length > 0;
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

export default Notification;
