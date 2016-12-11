import * as actions from '../src/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as fetchMock from 'fetch-mock';

import { ITodosState } from '../src/models';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expect = chai.expect;

let state: ITodosState = {
    didInvalidate: true,
    error: null,
    items: [],
    lastUpdated: Date.now(),
    requestStatus: { isLoading: false, type: '' },
};

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('creates RECEIVE_TODOS when fetching todos has been done', () => {
        const todo = { description: 'do something', id: 234, status: 0 };
        fetchMock.mock('http://localhost:8080/todos', [todo]);

        const expectedActions = [
            { type: actions.REQUEST_TODOS },
            { type: actions.RECEIVE_TODOS, todos: [todo] },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.getTodosIfNeeded())
            .then(() => { // return of async actions
                console.log(JSON.stringify(store.getActions()));
                expect(store.getActions()).to.eql(expectedActions);
            });
    });
});
