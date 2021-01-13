import { TextField } from '@material-ui/core';
import React from 'react';
import { Field } from 'react-final-form';
import { validators } from './form';
export const FormText = (props) => {
    const { className, name, validate, required, ...others } = props;
    const getDefaultValidator = () => {
        if (validate && required) {
            return validate || validators.required;
        }
        else if (required) {
            return validators.required;
        }
        else if (validate) {
            return validate;
        }
        return undefined;
    };
    return (React.createElement(Field, { name: name, validate: getDefaultValidator() }, props => (React.createElement(TextField, Object.assign({ className: className, name: props.input.name, value: props.input.value, required: required, onChange: props.input.onChange }, others, { error: props.meta.touched && (Boolean(props.meta.error) || Boolean(props.meta.submitError)), helperText: props.meta.touched && (props.meta.error || props.meta.submitError), autoComplete: 'off' })))));
};
//# sourceMappingURL=form-text.js.map