import * as React from 'react';

import { IError } from '../models';
import Snackbar from 'material-ui/Snackbar';

interface IErrorProps {
    error: IError;
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
        let message = this.state.open ? this.props.error.message : '';
        return (
            <Snackbar
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
