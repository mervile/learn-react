import { i18nReducer } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import auth from './features/auth/duck';
import modal from './features/common/modals/duck';
import projects from './features/projects/duck';
import todos from './features/todos/duck';

const reducers = combineReducers({
  auth,
  todos,
  projects,
  modal,
  i18n: i18nReducer,
});

export default reducers;
