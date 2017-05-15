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

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Import the Hot Module Reloading App Container – more on why we use 'require' below
const { AppContainer } = require('react-hot-loader');

// Tell Typescript that there is a global variable called module - see below
declare var module: { hot: any };

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
        <AppContainer>
          <Component />
        </AppContainer>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('appContainer')
);
render(App);

// Handle hot reloading requests from Webpack
if (module.hot) {
  module.hot.accept('./App', () => {
    // If we receive a HMR request for our App container, then reload it
    // using require (we can't do this dynamically with import)
    const NextApp = require('./App').default;
    // And render it into the root element again
    render(NextApp);
  });
}
