import {FormApi, SubmissionErrors, ValidationErrors} from 'final-form';
import React, {FC, ReactNode, useEffect} from 'react';
import {Form as FinalForm} from 'react-final-form';

export type FormSubmit = (values: Record<string, any>, form: FormApi) => SubmissionErrors | Promise<SubmissionErrors | undefined> | undefined | void;
export type FormValidate = (values: Record<string, any>) => ValidationErrors | Promise<ValidationErrors> | undefined;
export type FormRender = (form: FormApi, submitting: boolean, dirty: boolean) => ReactNode;

export interface FormProps {
  submit: FormSubmit;
  validate?: FormValidate;
  render: FormRender;
  autoClean?: boolean;
  initialValues?: Record<string, any>;
}

export const Form: FC<FormProps> = props => {
  const {submit, validate, render, autoClean = true, initialValues} = props;

  return (
    <FinalForm onSubmit={submit} initialValues={initialValues} validate={validate} subscription={{
      values: true,
      submitting: true,
      pristine: true,
      dirty: true,
      submitSucceeded: autoClean
    }} render={({handleSubmit, form, submitting, dirty, submitSucceeded}) => (
      <form style={{width: '100%'}} onSubmit={handleSubmit} noValidate>
        {
          autoClean && useEffect(() => {
            if (submitSucceeded) {
              // @ts-ignore
              // ref: https://github.com/final-form/final-form/issues/352
              form.restart();
            }
          }, [submitSucceeded])
        }
        {render(form, submitting, dirty)}
      </form>
    )}/>
  );
};

export const validators = {
  required: (value: any) => value ? undefined : 'Required',
  number: (value: any) => !isNaN(value) ? undefined : 'Must be a number'
};