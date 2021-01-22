import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Form as FinalForm } from 'react-final-form';
const useStyles = makeStyles(() => createStyles({
    root: {
        width: '100%'
    }
}));
export const Form = props => {
    const { className, submit, validate, render, autoClean = true, initialValues } = props;
    const classes = useStyles();
    return (React.createElement(FinalForm, { onSubmit: submit, initialValues: initialValues, validate: validate, subscription: {
            values: true,
            submitting: true,
            pristine: true,
            dirty: true,
            submitSucceeded: autoClean
        }, render: ({ handleSubmit, form, submitting, dirty, submitSucceeded, values }) => (React.createElement("form", { className: clsx(classes.root, className), onSubmit: handleSubmit, noValidate: true },
            useEffect(() => {
                if (autoClean && submitSucceeded) {
                    form.restart();
                }
            }, [submitSucceeded]),
            render({ form, submitting, dirty, values }))) }));
};
export const validators = {
    required: (value) => value ? undefined : 'Required',
    number: (value) => !isNaN(value) ? undefined : 'Must be a number'
};
//# sourceMappingURL=form.js.map