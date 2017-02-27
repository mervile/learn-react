import { connect } from 'react-redux';

import { IStateTree } from '../models';

import Error from '../components/Error';

const mapStateToProps = (state: IStateTree) => {
    return {
        error: state.request.error,
        message: state.request.message,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {};
};

const ErrorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Error);

export default ErrorContainer;
