import * as actions from '../src/data/actions';
import reducer from '../src/data/reducers/request';
import { IRequestState } from '../src/models';

const expect = chai.expect;
const todo = { description: 'do something', id: 234, status: 0 };
let state: IRequestState = {
    error: null,
    isLoading: false,
    message: '',
    type: '',
};

describe('request reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.have.any.keys('isLoading');
    });

    it('should handle ADD_TODO_REQUEST', () => {
        const addAction = {
            description: 'Run the tests',
            type: actions.ADD_TODO_REQUEST,
        };
        const newState: IRequestState = reducer(state, addAction);
        expect(newState.isLoading).to.eql(true);
        expect(newState.type).to.eql(actions.ADD_TODO_REQUEST);
    });
});
