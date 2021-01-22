import { Switch, Typography } from '@material-ui/core';
import React from 'react';
import { Field } from 'react-final-form';
export const FormSwitch = (props) => {
    const { className, name, label, validate, control, ...others } = props;
    return (React.createElement(Field, { name: name, type: 'checkbox', validate: validate }, props => (React.createElement(React.Fragment, null,
        React.createElement(Typography, { component: 'span', variant: 'body2', color: 'textSecondary' }, label),
        React.createElement(Switch, { name: props.input.name, checked: props.input.checked, onChange: props.input.onChange })))));
};
//# sourceMappingURL=form-switch.js.map