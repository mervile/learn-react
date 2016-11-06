import * as _ from "lodash";
import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { ITodoItem, Status } from "../models";
import { AddTodoForm } from "./AddTodoForm";
import TodoItemList from "./TodoItemList";

const list = [
    { description: "Setup a dev environment", id: "1", status: Status.Done },
    { description: "Learn React with Typescript", id: "2", status: Status.InProgress },
    { description: "Setup unit tests, Karma + shallow rendering?", id: "3", status: Status.Done },
    { description: "Use UI library e.g. Material UI", id: "4", status: Status.Done },
    { description: "Create small backend with Scala, Akka, Spray and some NoSQL DB", id: "5", status: Status.New },
    { description: "Integrate app with backend", id: "6", status: Status.New },
    { description: "Learn redux", id: "7", status: Status.New },
    { description: "Routing between states", id: "8", status: Status.New },
    { description: "Add drag and drop feature for list items", id: "9", status: Status.New },
];

interface ITodoItemListState { todos: ITodoItem[]; newTodo: ITodoItem; }

class TodoItemListContainer extends React.Component<{}, ITodoItemListState> {
    constructor() {
        super();
        this.state = {
            newTodo: this.createNewTodo(),
            todos: list,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.updateTodoList = this.updateTodoList.bind(this);
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
                    <TodoItemList todos={newItems} status={Status.New} updateTodoList={this.updateTodoList} />
                    <TodoItemList
                        todos={itemsInProgress}
                        status={Status.InProgress}
                        statusName="In progress"
                        updateTodoList={this.updateTodoList}
                    />
                    <TodoItemList todos={doneItems} status={Status.Done} updateTodoList={this.updateTodoList} />
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

    private findItemById(id: string): ITodoItem | undefined {
        return _.find(this.state.todos, (todoItem) => todoItem.id === id);
    }

    private updateTodoList(itemId: string, newStatus: number) {
        // Copy todos array
        const todos = this.state.todos.slice();
        const todo = this.findItemById(itemId);
        todo.status = newStatus;
        this.setState({ newTodo: this.state.newTodo, todos });
    }

    private handleSubmit(event: any) {
        event.preventDefault();  // prevent page refresh
        const newlist = this.state.todos.concat([this.state.newTodo]);
        this.setState({ newTodo: this.createNewTodo(), todos: newlist });
    }

    private getItemsByStatus(status: Status) {
        return _.filter(this.state.todos, (item: ITodoItem) => item.status === status);
    }
}

// Exporting as React.Component.. is a work around for Typescript issue
// "JSX element attributes type may not be a union type"
export default DragDropContext(HTML5Backend)(TodoItemListContainer) as React.ComponentClass<{}>;
