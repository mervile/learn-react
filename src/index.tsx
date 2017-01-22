import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the Hot Module Reloading App Container – more on why we use 'require' below
const { AppContainer } = require('react-hot-loader');

// Tell Typescript that there is a global variable called module - see below
declare var module: { hot: any };

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import * as createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import App from './components/App';
import todoApp from './reducers';

// Important that this is after all!
import '../main.scss';

import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const loggerMiddleware = createLogger();

let store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  )
);

ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <AppContainer>
          <App />
        </AppContainer>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('example')
);

// Handle hot reloading requests from Webpack
if (module.hot) {
  module.hot.accept('./components/App', () => {
    // If we receive a HMR request for our App container, then reload it
    // using require (we can't do this dynamically with import)
    const NextApp = require('./components/App').default;

    // And render it into the root element again
    ReactDOM.render(
        <MuiThemeProvider>
          <Provider store={store}>
            <AppContainer>
              <NextApp />
            </AppContainer>
          </Provider>
        </MuiThemeProvider>,
        document.getElementById('example')
    );
  });
}
