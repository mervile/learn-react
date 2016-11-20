import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";

import TodoItemListContainer from "./components/TodoItemListContainer";

// Important that this is after all!
import "../main.scss";

// TODO: Didn't work after upgrading to Windows 10?
//import * as injectTapEventPlugin from "react-tap-event-plugin";
//injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider><TodoItemListContainer /></MuiThemeProvider>,
    document.getElementById("example")
);
