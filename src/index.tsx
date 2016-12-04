import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers/todos';

import App from './components/App';

// Important that this is after all!
import '../main.scss';

// TODO: Didn't work after upgrading to Windows 10?
// import * as injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

const loggerMiddleware = createLogger();

let store = createStore(
  todoApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('example')
);
