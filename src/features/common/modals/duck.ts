// Modal actions, selectors and reducers

import {
    IModalState,
    IStateTree,
} from '../../../models';

// Action constants
// Exported for mainly for unit tests
export const SHOW_MODAL  = 'app/common/modals/SHOW_MODAL';
export const HIDE_MODAL  = 'app/common/modals/HIDE_MODAL';

// Action creators
function showModal(modalProps: any, modalType: string) {
    return {
        modalProps,
        type: SHOW_MODAL,
        modalType,
    };
}

function hideModal() {
    return {
        type: HIDE_MODAL,
    };
}

// reducers
function getInitialState(): IModalState {
    return {
        modalProps: {},
        modalType: null,
    };
}

function modal(state = getInitialState(), action: any): IModalState {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                modalProps: action.modalProps,
                modalType: action.modalType,
            };
        case HIDE_MODAL:
        default:
            return getInitialState();
    }
}

// selectors
const getType            = (state: IStateTree) => state.modal.modalType;
const getModalProps      = (state: IStateTree) => state.modal.modalProps;
const isOpen             = (state: IStateTree) => state.modal.modalType !== null;

// Export reducer which will be combined with other
// reducers in top level
export default modal;

// Export public interface for interacting with
// this feature
export {
    getType,
    getModalProps,
    isOpen,
    hideModal,
    showModal,
}
