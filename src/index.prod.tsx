import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import { applyMiddleware, createStore } from 'redux';
import * as createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import App from './App';
import reducers from './reducers';
import translationsObj from './translations';

import './styles/main.scss';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const loggerMiddleware = createLogger();

let store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  )
);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObj));
store.dispatch(setLocale('fi'));

const render = (Component: any) => ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Component />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('appContainer')
);
render(App);
