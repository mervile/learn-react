import * as actions from '../src/features/todos/duck';
import reducer from '../src/features/todos/duck';
import { IRequestState, ITodosState } from '../src/models';

const expect = chai.expect;
const todo = { description: 'do something', id: 234, status: 0 };
let rstate: IRequestState = {
    error: null,
    isLoading: false,
    message: '',
    type: '',
};
let state: ITodosState = {
    didInvalidate: true,
    items: [],
    lastUpdated: Date.now(),
    request: rstate,
};

describe('request reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.have.any.keys('items', 'lastUpdated');
    });

    it('should handle ADD_TODO_REQUEST', () => {
        const addAction = {
            description: 'Run the tests',
            type: actions.ADD_TODO_REQUEST,
        };
        const newState: ITodosState = reducer(state, addAction);
        expect(newState.request.isLoading).to.eql(true);
        expect(newState.request.type).to.eql(actions.ADD_TODO_REQUEST);
    });
});
