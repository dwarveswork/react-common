import { Switch, Typography } from '@material-ui/core';
import React from 'react';
import { Field } from 'react-final-form';
export const FormSwitch = (props) => {
    const { className, name, label, validate, control, ...others } = props;
    return (React.createElement(Field, { name: name, validate: validate }, props => (React.createElement(React.Fragment, null,
        React.createElement(Typography, { component: 'span', variant: 'body2', color: 'textSecondary' }, label),
        React.createElement(Switch, { checked: Boolean(props.input.value), onChange: props.input.onChange })))));
};
//# sourceMappingURL=form-switch.js.map