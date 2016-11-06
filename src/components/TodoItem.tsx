import MenuItem from "material-ui/MenuItem";
import SelectField from "material-ui/SelectField";
import * as React from "react";
import { DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";

import { ITodoItem, ItemTypes, Status } from "../models";

import "./TodoItem.scss";

interface ITodoItemProps {
    item: ITodoItem;
    onStatusUpdate: any;
    connectDragSource?: any;
    isDragging?: boolean;
}

const todoItemSource = {
    beginDrag(props: ITodoItemProps) {
        return { item: props.item };
    },
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

class TodoItem extends React.Component<ITodoItemProps, {}> {
    public render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div className="todoItem" style={{cursor: "move", opacity: isDragging ? 0.5 : 1}}>
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

// Exporting as React.Component.. is a work around for Typescript issue
// "JSX element attributes type may not be a union type"
export default DragSource(ItemTypes.TodoItem, todoItemSource,
    collect)(TodoItem) as React.ComponentClass<ITodoItemProps>;
