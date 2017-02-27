import auth from './auth';
import request from './request';
import todos from './todos';

import { combineReducers } from 'redux';

const todoApp = combineReducers({
  auth,
  request,
  todos,
});

export default todoApp;
