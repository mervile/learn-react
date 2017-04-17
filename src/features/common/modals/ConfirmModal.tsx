import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as React from 'react';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { IStateTree } from '../../../models';
import {
    getModalProps,
    hideModal,
    isOpen,
} from './duck';

interface IConfirmModalProps {
    confirmCallback: any;
    title: string;
    description: string;
    open: boolean;
    onConfirm(callback: any): void;
    hide(): void;
}

class ConfirmModalComponent extends React.Component<IConfirmModalProps, {}> {
    constructor() {
        super();

        this.handleClose = this.handleClose.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    public render() {
        const actions = [
            <FlatButton
                label={I18n.t('common.cancel')}
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label={I18n.t('common.submit')}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleConfirm}
            />,
        ];

        return (
            <div>
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.description}
                </Dialog>
            </div>
        );
    }

    private handleClose() {
        this.props.hide();
    }

    private handleConfirm() {
        const { onConfirm, confirmCallback, hide } = this.props;
        onConfirm(confirmCallback);
        hide();
    }
}

const mapStateToProps = (state: IStateTree) => {
    const modalProps = getModalProps(state);
    return {
        confirmCallback: modalProps.callback,
        description: modalProps.description,
        open: isOpen(state),
        title: modalProps.title,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        hide: () => {
            dispatch(hideModal());
        },
        onConfirm: (confirmCallback: any) => {
            dispatch(confirmCallback());
        },
    };
};

const ConfirmModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmModalComponent);

export default ConfirmModal;
