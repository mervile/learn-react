import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers/todos';

import App from './components/App';

// Important that this is after all!
import '../main.scss';

// TODO: Didn't work after upgrading to Windows 10?
//import * as injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

let store = createStore(todoApp)

ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('example')
);
