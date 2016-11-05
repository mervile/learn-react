import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { TodoItemList } from "./components/TodoItemList";

// Important that this is after all!
import "../main.scss";

import * as injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider><TodoItemList /></MuiThemeProvider>,
    document.getElementById("example")
);
