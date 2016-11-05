import { List, ListItem } from "material-ui/List";

import * as _ from "lodash";
import * as React from "react";

import { ITodoItem, Status } from "../models";
import { AddTodoForm } from "./AddTodoForm";
import { TodoItem } from "./TodoItem";

import "./TodoItemList.scss";

const list = [
    { description: "Setup a dev environment", id: "1", status: Status.Done },
    { description: "Learn React with Typescript", id: "2", status: Status.InProgress },
    { description: "Setup unit tests, Karma + shallow rendering?", id: "3", status: Status.Done },
    { description: "Use UI library e.g. Material UI", id: "4", status: Status.Done },
    { description: "Create small backend with Scala, Akka, Spray and some NoSQL DB", id: "5", status: Status.New },
    { description: "Integrate app with backend", id: "6", status: Status.New },
    { description: "Learn redux", id: "7", status: Status.New },
];

export interface ITodoItemListState { todos: ITodoItem[]; newTodo: ITodoItem; }

export class TodoItemList extends React.Component<{}, ITodoItemListState> {
    constructor() {
        super();
        this.state = {
            newTodo: this.createNewTodo(),
            todos: list,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        const newItems = this.getItemsByStatus(Status.New);
        const itemsInProgress = this.getItemsByStatus(Status.InProgress);
        const doneItems = this.getItemsByStatus(Status.Done);
        return (
            <div className="todoItemListContainer">
                <AddTodoForm
                    value={this.state.newTodo.description}
                    handleChange={this.handleChange}
                    submitTodo={this.handleSubmit}
                />
                <div className="todoItemList">
                    <h3>New</h3>
                    <List>{newItems}</List>
                    <h3>In progress</h3>
                    <List>{itemsInProgress}</List>
                    <h3>Done</h3>
                    <List>{doneItems}</List>
                </div>
            </div>
        );
    }

    private createNewTodo = (description: string = "", status: Status = Status.New) => {
        return { description, id: Math.random().toString(), status };
    }

    private handleChange(event: any) {
        this.setState({ newTodo: this.createNewTodo(event.target.value),
            todos: this.state.todos });
    }

    private handleStatusChange(item: ITodoItem, event: any, index: number, value: number) {
        // Copy todos array
        const todos = this.state.todos.slice();
        const todo = _.find(todos, (todoItem) => todoItem.id === item.id);
        todo.status = value;
        this.setState({ newTodo: this.state.newTodo, todos });
    }

    private handleSubmit(event: any) {
        event.preventDefault();  // prevent page refresh
        const newlist = this.state.todos.concat([this.state.newTodo]);
        this.setState({ newTodo: this.createNewTodo(), todos: newlist });
    }

    private getItemsByStatus(status: Status) {
        return _.chain(this.state.todos)
            .filter((item: ITodoItem) => item.status === status)
            .map((item: ITodoItem, i: number) =>
                <ListItem key={i}>
                    <TodoItem item={item} onStatusUpdate={this.handleStatusChange.bind(this, item)} />
                </ListItem>)
            .value();
    }
}
