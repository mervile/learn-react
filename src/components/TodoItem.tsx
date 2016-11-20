import MenuItem from "material-ui/MenuItem";
// import SelectField from "material-ui/SelectField";
import FontIcon from 'material-ui/FontIcon';
import * as React from "react";
import { DragSource, DragSourceConnector, DragSourceMonitor } from "react-dnd";

import { ITodoItem, ItemTypes, Status } from "../models";

import "./TodoItem.scss";

interface ITodoItemProps {
    item: ITodoItem;
    onDelete: any;
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
        const iconStyles = {
            float: "right",
            cursor: "pointer"
        };
        return connectDragSource(
            <div className="todoItem" style={{cursor: "move", opacity: isDragging ? 0.5 : 1}}>
                <span className="description">{ this.props.item.description }</span>
                <FontIcon
                    className="material-icons"
                    style={iconStyles}
                    onClick={this.props.onDelete}
                >
                    delete
                </FontIcon>
            </div>
        );
    }
}

/* TODO: Add this to create/update form
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
*/

// Exporting as React.Component.. is a work around for Typescript issue
// "JSX element attributes type may not be a union type"
export default DragSource(ItemTypes.TodoItem, todoItemSource,
    collect)(TodoItem) as React.ComponentClass<ITodoItemProps>;
