import { i18nReducer } from 'react-redux-i18n';
import { combineReducers } from 'redux';

import auth from './features/auth/duck';
import todos from './features/todos/duck';

const reducers = combineReducers({
  auth,
  todos,
  i18n: i18nReducer,
});

export default reducers;
