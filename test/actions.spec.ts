import * as actions from '../src/actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as fetchMock from 'fetch-mock';

import { ITodosState } from '../src/models';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const expect = chai.expect;

const API_URL = 'http://localhost:8080/api';
const todo = { description: 'do something', id: 234, status: 0, userId: '?' };
let state: ITodosState = {
    didInvalidate: true,
    items: [],
    lastUpdated: Date.now(),
};

describe('Todos actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('creates RECEIVE_TODOS when fetching todos has been done', () => {
        fetchMock.mock(`${API_URL}/todos`, [todo]);

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

    it('creates REQUEST_TODOS_FAILURE when fetching todos fails', () => {
        const error = 'DB error';
        fetchMock.mock(`${API_URL}/todos`, { body: error, status: 500 });

        const expectedActions = [
            { type: actions.REQUEST_TODOS },
            { type: actions.REQUEST_TODOS_FAILURE, error },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.getTodosIfNeeded())
            .then(() => { // return of async actions
                console.log(JSON.stringify(store.getActions()));
                const storeActions = store.getActions();
                expect(storeActions[0]).to.eql(expectedActions[0]);
                expect(storeActions[1].type).to.eql(actions.REQUEST_TODOS_FAILURE);
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
            { type: actions.ADD_TODO, description: todo.description },
            { type: actions.ADD_TODO_SUCCESS, todo },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.requestAddTodo(todo.description))
            .then(() => {
                const storeActions = store.getActions();
                expect(storeActions).to.eql(expectedActions);
            });
    });

    it('creates ADD_TODO_FAILURE when adding a todo fails', () => {
        const error = 'DB error';
        fetchMock.post(`${API_URL}/todo`, { body: error, status: 500 });

        const expectedActions = [
            { type: actions.ADD_TODO, description: todo.description },
            { type: actions.ADD_TODO_FAILURE, error },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.requestAddTodo(todo.description))
            .then(() => {
                const storeActions = store.getActions();
                expect(storeActions[0]).to.eql(expectedActions[0]);
                expect(storeActions[1].type).to.eql(actions.ADD_TODO_FAILURE);
            });
    });

    it('creates UPDATE_TODO_SUCCESS when updating a todo succeeds', () => {
        fetchMock.post(`${API_URL}/todo`, todo);

        const expectedActions = [
            { type: actions.UPDATE_TODO, todo },
            { type: actions.UPDATE_TODO_SUCCESS, todo },
        ];
        const store = mockStore({ todos: state });

        return store.dispatch(actions.requestUpdateTodo(todo))
            .then(() => {
                const storeActions = store.getActions();
                expect(storeActions).to.eql(expectedActions);
            });
    });

    it('creates UPDATE_TODO_FAILURE when updating a todo fails');

    it('creates DELETE_TODO_SUCCESS when deleting a todo succeeds');
    it('creates DELETE_TODO_FAILURE when deleting a todo fails');
});
