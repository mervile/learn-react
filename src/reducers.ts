import auth from './features/auth/duck';
import todos from './features/todos/duck';

import { combineReducers } from 'redux';

const todoApp = combineReducers({
  auth,
  todos,
});

export default todoApp;
