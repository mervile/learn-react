import * as _ from "lodash";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "whatwg-fetch";

import { ITodoItem, Status } from "../models";
import { AddTodoForm } from "./AddTodoForm";
import TodoItemList from "./TodoItemList";

interface ITodoItemListState { todos: ITodoItem[]; newTodo: ITodoItem; }

const API_URL = "http://localhost:8080";

class TodoItemListContainer extends React.Component<{}, ITodoItemListState> {
    constructor() {
        super();
        this.state = {
            newTodo: this.createNewTodo(),
            todos: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.updateTodoStatus = this.updateTodoStatus.bind(this);
    }

    public componentDidMount() {
        this.getTodoList();
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
                    <TodoItemList
                        todos={newItems}
                        status={Status.New}
                        updateTodoStatus={this.updateTodoStatus}
                    />
                    <TodoItemList
                        todos={itemsInProgress}
                        status={Status.InProgress}
                        statusName="In progress"
                        updateTodoStatus={this.updateTodoStatus}
                    />
                    <TodoItemList
                        todos={doneItems}
                        status={Status.Done}
                        updateTodoStatus={this.updateTodoStatus}
                    />
                </div>
            </div>
        );
    }

    private getTodoList() {
        fetch(`${API_URL}/todos`)
            .then((response: any) => {
                return response.json();
            }).then((todos: ITodoItem[]) => {
                this.setState({ newTodo: this.state.newTodo, todos });
            }).catch((error) => {
                console.error("Error receiving todo list", error);
            });
    }

    private createNewTodo = (description: string = "", status: Status = Status.New) => {
        return { description, id: -1, status };
    }

    private handleChange(event: any) {
        this.setState({ newTodo: this.createNewTodo(event.target.value),
            todos: this.state.todos });
    }

    private findItemById(id: number): ITodoItem | undefined {
        return _.find(this.state.todos, (todoItem) => todoItem.id === id);
    }

    private updateTodoStatus(itemId: number, newStatus: number) {
        // Copy todos array
        const todos = this.state.todos.slice();
        const todo = this.findItemById(itemId);
        todo.status = newStatus;
        this.saveTodo(todo)
            .then((newTodo: ITodoItem) => {
                this.setState({ newTodo: this.state.newTodo, todos });
            });
    }

    private handleSubmit(event: any) {
        event.preventDefault();  // prevent page refresh
        this.saveTodo(this.state.newTodo)
            .then((newTodo: ITodoItem) => {
                const newlist = this.state.todos.concat([newTodo]);
                this.setState({ newTodo: this.createNewTodo(), todos: newlist });
            });
    }

    private getItemsByStatus(status: Status) {
        return _.filter(this.state.todos, (item: ITodoItem) => item.status === status);
    }

    private saveTodo(todo: ITodoItem) {
        return fetch(`${API_URL}/todo`, {
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        })
        .then((response: any) => {
            return response.json();
        }).catch((error) => {
            console.error("Error saving new todo!", error, this.state.newTodo);
        });
    }
}

// Exporting as React.Component.. is a work around for Typescript issue
// "JSX element attributes type may not be a union type"
export default DragDropContext(HTML5Backend)(TodoItemListContainer) as React.ComponentClass<{}>;
