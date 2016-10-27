import * as React from "react";

import { ITodoItemProps } from "../models";

import "./TodoItem.scss";

export class TodoItem extends React.Component<ITodoItemProps, {}> {
    public render() {
        return (
            <div className="todoItem">
                <span className="description">{ this.props.description }</span>
            </div>
        );
    }
}
