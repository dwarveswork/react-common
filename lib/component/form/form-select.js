import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Field } from 'react-final-form';
import { validators } from './form';
export const FormSelect = (props) => {
    const { className, name, label, placeholder, options, validate, required, ...others } = props;
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
    return (React.createElement(Field, { name: name, validate: getDefaultValidator() }, props => (React.createElement(FormControl, Object.assign({ className: className, required: required, error: props.meta.touched && (Boolean(props.meta.error) || Boolean(props.meta.submitError)) }, others),
        label && React.createElement(InputLabel, { id: `${props.input.name}-label` }, label),
        React.createElement(Select, { labelId: `${props.input.name}-label`, id: `${props.input.name}-select`, value: props.input.value, onChange: props.input.onChange },
            placeholder && (React.createElement(MenuItem, { key: 'placeholder', value: '', disabled: true }, placeholder)),
            options.map(o => (React.createElement(MenuItem, { key: o.value, value: o.value }, o.title)))),
        React.createElement(FormHelperText, null, props.meta.touched && (props.meta.error || props.meta.submitError))))));
};
//# sourceMappingURL=form-select.js.map