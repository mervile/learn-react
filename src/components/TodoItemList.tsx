import * as _ from "lodash";
import * as React from "react";

import { ITodoItemListProps, ITodoItemProps, Status } from "../models";
import { TodoItem } from "./TodoItem";

import "./TodoItemList.scss";

export class TodoItemList extends React.Component<ITodoItemListProps, {}> {
    public render() {
        const newItems = this.getItemsByStatus(Status.New);
        const itemsInProgress = this.getItemsByStatus(Status.InProgress);
        const doneItems = this.getItemsByStatus(Status.Done);
        return (
            <div className="todoItemList">
                <h2>New</h2>
                <ul className="new">{newItems}</ul>
                <h2>In progress</h2>
                <ul className="inProgress">{itemsInProgress}</ul>
                <h2>Done</h2>
                <ul className="done">{doneItems}</ul>
            </div>
        );
    }

    private getItemsByStatus(status: Status) {
        return _.chain(this.props.items)
            .filter((item: ITodoItemProps) => item.status === status)
            .map((item: ITodoItemProps, i: number) =>
                <li key={i}><TodoItem description={item.description} status={item.status} /></li>)
            .value();
    }
}
