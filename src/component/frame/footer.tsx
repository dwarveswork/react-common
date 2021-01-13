import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React, {FC} from 'react';
import {CommonComponentProps} from '../common-component';

export interface FooterProps extends CommonComponentProps {}

const useStyles = makeStyles(theme => ({
  root: {}
}));

export const Footer: FC<FooterProps> = props => {

  const {className} = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}/>
  );
};