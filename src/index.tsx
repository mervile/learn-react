import * as React from "react";
import * as ReactDOM from "react-dom";

import { TodoItemList } from "./components/TodoItemList";
import { Status } from "./models";

// Important that this is after all!
import "../main.scss";

const list = [
    { description: "Setup a dev environment", status: Status.Done },
    { description: "Learn React with Typescript", status: Status.InProgress },
    { description: "Setup unit tests, Karma + shallow rendering?", status: Status.New },
    { description: "Use UI library e.g. Material UI", status: Status.New },
    { description: "Create small backend with Scala, Akka, Spray and some NoSQL DB", status: Status.New },
    { description: "Integrate app with backend", status: Status.New },
    { description: "Learn redux", status: Status.InProgress },
];

ReactDOM.render(
    <div><h1>My Todo list</h1><TodoItemList items={list} /></div>,
    document.getElementById("example")
);
