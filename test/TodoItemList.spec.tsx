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
});
