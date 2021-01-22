import {Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {FC} from 'react';
import {CommonComponentProps} from '../common-component';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '60px',
    maxHeight: '60px',
    overflow: 'hidden',
    padding: `0 ${theme.spacing(2)}px`,
    '&:first-child': {
      paddingLeft: theme.spacing(3)
    },
    '&:last-child': {
      paddingRight: theme.spacing(3)
    },
    fontSize: theme.typography.body2.fontSize
  },
  typography: {
    fontSize: 'inherit',
    fontWeight: 'inherit'
  }
}));

export type DataTableCellAlignment = 'left' | 'center' | 'right';
export const DEFAULT_CELL_WIDTH = 100;

export interface DataTableCellProps extends CommonComponentProps {
  width?: number;
  flex?: string;
  title?: string;
  align?: DataTableCellAlignment;
}

export const DataTableCell: FC<DataTableCellProps> = props => {
  const {className, width = DEFAULT_CELL_WIDTH, flex, title, align = 'left', children} = props;
  const classes = useStyles();
  const alignment = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  };
  const widthStyles = flex ? {flex: flex} : {minWidth: width, maxWidth: width};

  return (
    <div className={clsx(classes.root, className)} style={{justifyContent: alignment[align], ...widthStyles}} title={title}>
      {(children !== Object(children)) ? (
        <Typography className={classes.typography} variant={'body2'} noWrap>{children}</Typography>
      ) : children}
    </div>
  );
};
