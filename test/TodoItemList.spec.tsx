import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import { TodoItemList } from "../src/components/TodoItemList";
import { Status } from "../src/models";

describe("Todo item list", () => {
    const items = [
        { description: "Setup a dev environment", status: Status.Done },
        { description: "Learn React with Typescript", status: Status.InProgress },
        { description: "Setup unit tests, Karma + shallow rendering?", status: Status.New },
        { description: "Use UI library e.g. Material UI", status: Status.New },
        { description: "Create small backend with Scala, Akka, Spray and some NoSQL DB", status: Status.New },
        { description: "Integrate app with backend", status: Status.New },
        { description: "Learn redux", status: Status.InProgress },
    ];
    let renderer: TestUtils.ShallowRenderer;

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        renderer.render(<TodoItemList items={items} />);
    });

    it("should render correctly", () => {
        const result = renderer.getRenderOutput();
        chai.assert.strictEqual(result.type, "div");
    });
});
