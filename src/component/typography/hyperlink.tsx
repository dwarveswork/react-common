import {Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {FC} from 'react';
import {CommonComponentProps} from '../common-component';

export interface HyperlinkProps extends CommonComponentProps {
  label: string;
  onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'inline-block',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}));

export const Hyperlink: FC<HyperlinkProps> = props => {
  const {className, label, onClick} = props;
  const classes = useStyles();

  return (
    <Typography className={clsx(classes.root, className)} variant={'body2'} component={'span'} color={'secondary'} onClick={onClick}>{label}</Typography>
  );
};