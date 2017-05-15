import * as React from 'react';
import { connect } from 'react-redux';

import { IStateTree } from '../../../models';
import {
    getType,
} from './duck';

import ConfirmModal from './ConfirmModal';

const MODAL_COMPONENTS: any = {
  CONFIRM_MODAL: ConfirmModal,
};

interface IModalProps {
    modalType: string;
}

class ModalComponent extends React.Component<IModalProps, {}> {
    constructor() {
        super();
    }

    public render() {
        const { modalType } = this.props;
        if (modalType === null) {
            return null;
        }

        const Modal = MODAL_COMPONENTS[modalType];
        return <Modal />;
    }
}

const mapStateToProps = (state: IStateTree) => {
    return {
        modalType: getType(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
    };
};

const Modal = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalComponent);

export default Modal;
