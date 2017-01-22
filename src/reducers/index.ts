import auth from './auth';
import todos from './todos';
import { combineReducers } from 'redux';

const todoApp = combineReducers({
  auth,
  todos,
});

export default todoApp;
