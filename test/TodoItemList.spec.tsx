import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { mount } from "enzyme";

import TodoItem from "../src/components/TodoItem";
import TodoItemListContainer from "../src/components/TodoItemListContainer";

const expect = chai.expect;

describe("Todo item list", () => {
    let todoItemList: any;

    beforeEach(() => {
        todoItemList = mount(<MuiThemeProvider><TodoItemListContainer /></MuiThemeProvider>);
    });

    it("should render correctly", () => {
        expect(todoItemList.find(TodoItem)).to.have.length(9);
        expect(todoItemList.find("List")).to.have.length(3);
        expect(todoItemList.find("AddTodoForm")).to.have.length(1);
    });

    it("should create new todo items", () => {
        todoItemList.find("button").simulate("click");
        expect(todoItemList.find(TodoItem)).to.have.length(10);
    });

    // TODO SelectField unit testing?
    xit("should update todo item's state", () => {
        const newTodos = todoItemList.find("List").at(0);
        const inProgress = todoItemList.find("List").at(1);
        expect(newTodos.find("ListItem")).to.have.length(3);
        expect(inProgress.find("ListItem")).to.have.length(1);
        const select = todoItemList.find("SelectField").at(0);
        select.simulate("change", {target: { value : 1 }});
        expect(newTodos.find("ListItem")).to.have.length(2);
        expect(inProgress.find("ListItem")).to.have.length(2);
    });
});
