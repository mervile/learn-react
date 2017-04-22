import { i18nReducer } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import auth from './features/auth/duck';
import modal from './features/common/modals/duck';
import projects from './features/projects/duck';
import todos from './features/todos/duck';
import users from './features/users/duck';

const reducers = combineReducers({
  auth,
  todos,
  projects,
  modal,
  i18n: i18nReducer,
  users,
});

export default reducers;
