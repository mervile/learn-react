import * as React from "react";

interface IAddTodoFormProps { value: string; handleChange: any; submitTodo: any; }

export function AddTodoForm(props: IAddTodoFormProps) {
    return (
        <form className="addTodoForm">
            <input
                type="text"
                placeholder="Add new todo"
                value={props.value}
                onChange={props.handleChange}
            />
            <button onClick={props.submitTodo}>Submit</button>
        </form>
    );
}