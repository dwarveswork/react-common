import {Switch, Typography} from '@material-ui/core';
import {FormControlLabelProps} from '@material-ui/core/FormControlLabel/FormControlLabel';
import React, {FC} from 'react';
import {Field} from 'react-final-form';
import {CommonComponentProps} from '../common-component';

export interface FormSwitchProps extends CommonComponentProps {
  name: string;
  label: string;
  validate?: (value: boolean) => any | Promise<any>;
}

export const FormSwitch: FC<FormSwitchProps & Partial<FormControlLabelProps>> = (props) => {

  const {className, name, label, validate, control, ...others} = props;

  return (
    <Field<boolean> name={name} type={'checkbox'} validate={validate}>{props => (
      <>
        <Typography component={'span'} variant={'body2'} color={'textSecondary'}>{label}</Typography>
        <Switch name={props.input.name} checked={props.input.checked} onChange={props.input.onChange}/>
      </>
    )}</Field>
  );
};