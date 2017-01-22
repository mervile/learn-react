import { connect } from 'react-redux';

import { IStateTree } from '../models';

import Error from '../components/Error';

const mapStateToProps = (state: IStateTree) => {
    return {
        error: state.todos.error || state.auth.error,
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
