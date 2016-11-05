import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import * as React from "react";

import { ITodoItem, Status } from "../models";

import "./TodoItem.scss";

export interface ITodoItemProps { item: ITodoItem; onStatusUpdate: any; }

export class TodoItem extends React.Component<ITodoItemProps, {}> {
    public render() {
        return (
            <div className="todoItem">
                <span className="description">{ this.props.item.description }</span>
                <SelectField
                    style={{float:"right", top:"-20px"}}
                    value={this.props.item.status}
                    onChange={this.props.onStatusUpdate}
                    autoWidth={true}
                >
                    <MenuItem value={Status.New} primaryText="New" />
                    <MenuItem value={Status.InProgress} primaryText="In progress" />
                    <MenuItem value={Status.Done} primaryText="Done" />
                </SelectField>
            </div>
        );
    }
}
