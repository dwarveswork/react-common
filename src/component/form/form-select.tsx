import {FormControl, FormControlProps, FormHelperText, InputLabel, MenuItem, Select} from '@material-ui/core';
import React, {FC} from 'react';
import {Field} from 'react-final-form';
import {CommonComponentProps} from '../common-component';
import {validators} from './form';

export interface SelectOption {
  title: string;
  value: any;
}

export interface FormSelectProps extends CommonComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  validate?: (value: string) => any | Promise<any>;
}

export const FormSelect: FC<FormSelectProps & FormControlProps> = (props) => {

  const {className, name, label, placeholder, options, validate, required, ...others} = props;

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
      <FormControl className={className} required={required}
                   error={props.meta.touched && (Boolean(props.meta.error) || Boolean(props.meta.submitError))} {...others}>
        {label && <InputLabel id={`${props.input.name}-label`}>{label}</InputLabel>}
        <Select
          labelId={`${props.input.name}-label`}
          id={`${props.input.name}-select`}
          value={props.input.value}
          onChange={props.input.onChange}
        >
          {placeholder && (
            <MenuItem key={'placeholder'} value={''} disabled>{placeholder}</MenuItem>
          )}
          {options.map(o => (
            <MenuItem key={o.value} value={o.value}>{o.title}</MenuItem>
          ))}
        </Select>
        <FormHelperText>{props.meta.touched && (props.meta.error || props.meta.submitError)}</FormHelperText>
      </FormControl>
    )}</Field>
  );
};