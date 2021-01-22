import {createStyles, makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {FormApi, SubmissionErrors, ValidationErrors} from 'final-form';
import React, {FC, ReactNode, useEffect} from 'react';
import {Form as FinalForm} from 'react-final-form';
import {CommonComponentProps} from '../common-component';

export type FormSubmit = (values: Record<string, any>, form: FormApi) => SubmissionErrors | Promise<SubmissionErrors | undefined> | undefined | void;
export type FormValidate = (values: Record<string, any>) => ValidationErrors | Promise<ValidationErrors> | undefined;
export type FormRender = (props: {form: FormApi, submitting: boolean, dirty: boolean, values: Record<string, any>}) => ReactNode;

export interface FormProps extends CommonComponentProps {
  submit: FormSubmit;
  validate?: FormValidate;
  render: FormRender;
  autoClean?: boolean;
  initialValues?: Record<string, any>;
}

const useStyles = makeStyles(() => createStyles({
  root: {
    width: '100%'
  }
}));

export const Form: FC<FormProps> = props => {
  const {className, submit, validate, render, autoClean = true, initialValues} = props;
  const classes = useStyles();

  return (
    <FinalForm onSubmit={submit} initialValues={initialValues} validate={validate} subscription={{
      values: true,
      submitting: true,
      pristine: true,
      dirty: true,
      submitSucceeded: autoClean
    }} render={({handleSubmit, form, submitting, dirty, submitSucceeded, values}) => (
      <form className={clsx(classes.root, className)} onSubmit={handleSubmit} noValidate>
        {
          useEffect(() => {
            if (autoClean && submitSucceeded) {
              // @ts-ignore
              // ref: https://github.com/final-form/final-form/issues/352
              form.restart();
            }
          }, [submitSucceeded])
        }
        {render({form, submitting, dirty, values})}
      </form>
    )}/>
  );
};

export const validators = {
  required: (value: any) => value ? undefined : 'Required',
  number: (value: any) => !isNaN(value) ? undefined : 'Must be a number'
};