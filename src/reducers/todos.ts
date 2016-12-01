import {
    ADD_TODO,
    DELETE_TODO,
    UPDATE_TODO,
} from '../actions';

const initialState = {
    todos: [],
};

function todoApp(state = initialState, action: any) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    { id: -1, description: action.description, status: 0 },
                ],
            });
        case UPDATE_TODO:
            const todos = state.todos.slice();
            let todo = todos.find((todo) => action.todo.id === todo.id);
            todo = action.todo;
            return {
                todos,
            };
        case DELETE_TODO:
        default:
            return state;
    }
}

export default todoApp;
