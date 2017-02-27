import * as React from 'react';

import Snackbar from 'material-ui/Snackbar';

interface IErrorProps {
    error: Response | null;
    message: string;
}

interface IErrorState {
    open: boolean;
}

class Error extends React.Component<IErrorProps, IErrorState> {
    constructor() {
        super();
        this.close = this.close.bind(this);
        this.state = {
            open: false,
        };
    }

    public componentWillReceiveProps(nextProps: IErrorProps) {
        const hasError = nextProps.error !== null;
        this.setState({ open: hasError });
    }

    public render() {
        let message = this.state.open ? this.props.message : '';
        return (
            <Snackbar
                bodyStyle={{backgroundColor:'red'}}
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

export default Error;
