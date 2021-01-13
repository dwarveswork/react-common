import {TextField, TextFieldProps} from '@material-ui/core';
import React, {FC} from 'react';
import {Field} from 'react-final-form';
import {CommonComponentProps} from '../common-component';
import {validators} from './form';

export interface FormTextProps extends CommonComponentProps {
  name: string;
  validate?: (value: string) => any | Promise<any>;
}

export const FormText: FC<FormTextProps & TextFieldProps> = (props) => {

  const {className, name, validate, required, ...others} = props;

  const getDefaultValidator = () => {
    if (validate && required) {
      return validate || validators.required;
    } else if (required) {
      return validators.required;
    } else if (validate) {
      return validate;
    }
    return undefined;
  };

  return (
    <Field name={name} validate={getDefaultValidator()}>{props => (
      <TextField className={className} name={props.input.name} value={props.input.value} required={required}
                 onChange={props.input.onChange} {...others}
                 error={props.meta.touched && (Boolean(props.meta.error) || Boolean(props.meta.submitError))}
                 helperText={props.meta.touched && (props.meta.error || props.meta.submitError)} autoComplete={'off'}/>
    )}</Field>
  );
};