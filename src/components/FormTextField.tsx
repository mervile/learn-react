import * as _ from 'lodash';
import TextField from 'material-ui/TextField';
import * as React from 'react';

import { IField } from '../models';

interface IValidator {
    errorText: string;
    validate(value: string | number): boolean;
}

interface IFormTextFieldState {
    errorText: string;
    isPristine: boolean;
    value: string;
}

interface IFormTextFieldProps {
    type: string;
    name: string;
    hintText: string;
    isRequired: boolean;
    validators?: IValidator[];
    onUpdate?(field: IField): void;
}

const initState = {
    errorText: '',
    isPristine: true,
    value: '',
};

class FormTextField extends React.Component<IFormTextFieldProps, IFormTextFieldState> {

    constructor() {
        super();

        this.state = initState;
        this.handleChange = this.handleChange.bind(this);
    }

    public render() {
        const { type, name, hintText, isRequired } = this.props;
        let hint = isRequired ? `${hintText} *` : hintText;
        return (
            <TextField
                style={{margin:'5px 5px 10px 0px'}}
                type={type}
                name={name}
                hintText={hint}
                errorText={this.state.errorText}
                onChange={this.handleChange}
            />
        );
    }

    private handleChange(event: any) {
        const { name, validators, onUpdate } = this.props;
        let errorText = '';
        if (this.props.isRequired && event.target.value.trim().length === 0) {
            errorText = 'This field is required!';
        } else if (typeof validators !== 'undefined') {
            validators.map(validator => {
                if (!validator.validate(event.target.value)) {
                    errorText +=  ' ' + validator.errorText;
                }
            });
        }
        this.setState({
            errorText,
            isPristine: false,
            value: event.target.value,
        });

        if (typeof onUpdate !== 'undefined') {
            onUpdate({ value: event.target.value, name, isValid: errorText.length === 0 });
        }
    }
}

export default FormTextField;
