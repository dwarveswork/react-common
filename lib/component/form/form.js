import React, { useEffect } from 'react';
import { Form as FinalForm } from 'react-final-form';
export const Form = props => {
    const { submit, validate, render, autoClean = true, initialValues } = props;
    return (React.createElement(FinalForm, { onSubmit: submit, initialValues: initialValues, validate: validate, subscription: {
            values: true,
            submitting: true,
            pristine: true,
            dirty: true,
            submitSucceeded: autoClean
        }, render: ({ handleSubmit, form, submitting, dirty, submitSucceeded }) => (React.createElement("form", { style: { width: '100%' }, onSubmit: handleSubmit, noValidate: true },
            autoClean && useEffect(() => {
                if (submitSucceeded) {
                    form.restart();
                }
            }, [submitSucceeded]),
            render(form, submitting, dirty))) }));
};
export const validators = {
    required: (value) => value ? undefined : 'Required',
    number: (value) => !isNaN(value) ? undefined : 'Must be a number'
};
//# sourceMappingURL=form.js.map