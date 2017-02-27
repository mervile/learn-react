import * as actions from '../src/actions';
import { ITodosState } from '../src/models';
import reducer from '../src/reducers/todos';

const expect = chai.expect;
const todo = { description: 'do something', id: 234, status: 0 };
let state: ITodosState = {
    didInvalidate: true,
    items: [],
    lastUpdated: Date.now(),
};

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).to.have.any.keys('items');
    });

    xit('should handle ADD_TODO', () => {
        const addAction = {
            description: 'Run the tests',
            type: actions.ADD_TODO,
        };
        const newState: ITodosState = reducer(state, addAction);
        expect(newState).to.eql({ isLoading: true,
            type: actions.ADD_TODO });
    });
});
