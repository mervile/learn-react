import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import { TodoItemList } from "../src/components/TodoItemList";

describe("Todo item list", () => {
    let renderer: TestUtils.ShallowRenderer;

    beforeEach(() => {
        renderer = TestUtils.createRenderer();
        renderer.render(<TodoItemList />);
    });

    it("should render correctly", () => {
        const result = renderer.getRenderOutput();
        chai.assert.strictEqual(result.type, "div");
    });
});
