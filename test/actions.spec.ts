import * as actions from '../src/features/todos/duck';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as fetchMock from 'fetch-mock';

import { IRequestState, ITodosState } from '../src/models';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expect = chai.expect;

const API_URL = 'http://localhost:8080/api';
const todo = { description: 'do something', id: 234, status: 0, userId: '?' };
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


describe('Todos actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('creates TODOS_SUCCESS when fetching todos has been done', () => {
        fetchMock.mock(`${API_URL}/todos`, [todo]);

        const expectedActions = [
            { type: actions.TODOS_REQUEST },
            { type: actions.TODOS_SUCCESS, todos: [todo] },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.getTodosIfNeeded())
            .then(() => { // return of async actions
                console.log(JSON.stringify(store.getActions()));
                expect(store.getActions()).to.eql(expectedActions);
            });
    });

    it('creates TODOS_FAILURE when fetching todos fails', () => {
        const error = 'DB error';
        fetchMock.mock(`${API_URL}/todos`, { body: error, status: 500 });

        const expectedActions = [
            { type: actions.TODOS_REQUEST },
            { type: actions.TODOS_FAILURE, error },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.getTodosIfNeeded())
            .then(() => { // return of async actions
                console.log(JSON.stringify(store.getActions()));
                const storeActions = store.getActions();
                expect(storeActions[0].type).to.eql(actions.TODOS_REQUEST);
                expect(storeActions[1].type).to.eql(actions.TODOS_FAILURE);
            });
    });
});

describe('Todo actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('creates ADD_TODO_SUCCESS when adding a todo succeeds', () => {
        fetchMock.post(`${API_URL}/todo`, todo);

        const expectedActions = [
            { type: actions.ADD_TODO_REQUEST, description: todo.description },
            { type: actions.ADD_TODO_SUCCESS, todo },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.requestAddTodo(todo.description))
            .then(() => {
                const storeActions = store.getActions();
                expect(storeActions[0].type).to.equal(actions.ADD_TODO_REQUEST);
                expect(storeActions[1].type).to.equal(actions.ADD_TODO_SUCCESS);
            });
    });

    it('creates ADD_TODO_FAILURE when adding a todo fails', () => {
        const error = 'DB error';
        fetchMock.post(`${API_URL}/todo`, { body: error, status: 500 });

        const expectedActions = [
            { type: actions.ADD_TODO_REQUEST, description: todo.description },
            { type: actions.ADD_TODO_FAILURE, error },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.requestAddTodo(todo.description))
            .then(() => {
                const storeActions = store.getActions();
                expect(storeActions[0].type).to.eql(expectedActions[0].type);
                expect(storeActions[1].type).to.eql(actions.ADD_TODO_FAILURE);
            });
    });

    it('creates UPDATE_TODO_SUCCESS when updating a todo succeeds', () => {
        fetchMock.post(`${API_URL}/todo`, todo);

        const expectedActions = [
            { type: actions.UPDATE_TODO_REQUEST, todo },
            { type: actions.UPDATE_TODO_SUCCESS, todo },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.requestUpdateTodo(todo))
            .then(() => {
                const storeActions = store.getActions();
                expect(storeActions[0].type).to.eql(actions.UPDATE_TODO_REQUEST);
                expect(storeActions[1].type).to.eql(actions.UPDATE_TODO_SUCCESS);
            });
    });

    it('creates UPDATE_TODO_REQUEST_FAILURE when updating a todo fails');

    it('creates DELETE_TODO_SUCCESS when deleting a todo succeeds');
    it('creates DELETE_TODO_FAILURE when deleting a todo fails');
});
