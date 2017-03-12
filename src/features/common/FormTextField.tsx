import * as _ from 'lodash';
import TextField from 'material-ui/TextField';
import * as React from 'react';
import { I18n } from 'react-redux-i18n';

import { IAsyncValidator, IField, IValidator } from '../../models';

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
    validator?: IValidator;
    asyncValidator?: IAsyncValidator;
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

    private validateChange(value: string) {
        const { validator, asyncValidator } = this.props;
        let errorText = '';
        if (this.props.isRequired && value.trim().length === 0) {
            errorText = I18n.t('common.requiredField');
        } else {
            if (typeof validator !== 'undefined' &&
                !validator.validate(value)) {
                errorText +=  ' ' + validator.errorText;
            }
            if (typeof asyncValidator !== 'undefined') {
                // TODO Try out RxJS
                asyncValidator.validate(value).then((res: any) => {
                    if (res.username === this.state.value) {
                        // Update value again after result is known
                        const txt = !res.isValid ? asyncValidator.errorText : '';
                        this.update(txt, value);
                    }
                });
            }
        }
        return errorText;
    }

    private update(errorText: string, value: string) {
        const { name, onUpdate } = this.props;
        this.setState({
            errorText,
            isPristine: false,
            value,
        });

        if (typeof onUpdate !== 'undefined') {
            onUpdate({ value, name, isValid: errorText.length === 0 });
        }
    }

    private handleChange(event: any) {
        const val = event.target.value;
        this.update(this.validateChange(val), val);
    }
}

export default FormTextField;
