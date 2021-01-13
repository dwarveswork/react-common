import {Switch, Typography} from '@material-ui/core';
import {FormControlLabelProps} from '@material-ui/core/FormControlLabel/FormControlLabel';
import React, {FC} from 'react';
import {Field} from 'react-final-form';
import {CommonComponentProps} from '../common-component';

export interface FormSwitchProps extends CommonComponentProps {
  name: string;
  label: string;
  validate?: (value: string) => any | Promise<any>;
}

export const FormSwitch: FC<FormSwitchProps & Partial<FormControlLabelProps>> = (props) => {

  const {className, name, label, validate, control, ...others} = props;

  return (
    <Field name={name} validate={validate}>{props => (
      <>
        <Typography component={'span'} variant={'body2'} color={'textSecondary'}>{label}</Typography>
        <Switch checked={Boolean(props.input.value)} onChange={props.input.onChange}/>
      </>
    )}</Field>
  );
};