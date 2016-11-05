import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";

interface IAddTodoFormProps { value: string; handleChange: any; submitTodo: any; }

export function AddTodoForm(props: IAddTodoFormProps) {
    return (
        <form className="addTodoForm">
            <TextField
                type="text"
                hintText="Add new todo"
                value={props.value}
                onChange={props.handleChange}
            />
            <RaisedButton style={{margin:"10px"}} onClick={props.submitTodo} label="Submit" />
        </form>
    );
}
