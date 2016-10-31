import * as React from "react";
import * as ReactDOM from "react-dom";
import { mount } from "enzyme";

import { TodoItem } from "../src/components/TodoItem";
import { TodoItemList } from "../src/components/TodoItemList";

const expect = chai.expect;

describe("Todo item list", () => {
    let todoItemList: any;

    beforeEach(() => {
        todoItemList = mount(<TodoItemList />);
    });

    it("should render correctly", () => {
        expect(todoItemList.find(TodoItem)).to.have.length(7);
        expect(todoItemList.find("ul")).to.have.length(3);
        expect(todoItemList.find("input")).to.have.length(1);
    });

    it("should create new todo items", () => {
        todoItemList.find("button").simulate("click");
        expect(todoItemList.find(TodoItem)).to.have.length(8);
    });

    it("should update todo item's state", () => {
        const newTodos = todoItemList.find("ul").at(0);
        const inProgress = todoItemList.find("ul").at(1);
        expect(newTodos.find("li")).to.have.length(3);
        expect(inProgress.find("li")).to.have.length(2);
        const select = todoItemList.find("select").at(0);
        select.simulate("change", {target: { value : "1" }});
        expect(newTodos.find("li")).to.have.length(2);
        expect(inProgress.find("li")).to.have.length(3);
    });
});
