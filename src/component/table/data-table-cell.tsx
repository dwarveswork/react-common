import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {FC} from 'react';
import {CommonComponentProps} from '../common-component';

export type DataTableCellAlignment = 'left' | 'center' | 'right';

export interface DataTableCellProps extends CommonComponentProps {
  width?: string;
  fullWidth?: boolean;
  title?: string;
  align?: DataTableCellAlignment;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: '60px',
    minHeight: '60px',
    maxHeight: '60px',
    overflow: 'hidden',
    padding: `0 ${theme.spacing(2)}px`,
    lineHeight: '60px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.primary,
    '&:first-child': {
      paddingLeft: theme.spacing(3)
    },
    '&:last-child': {
      paddingRight: theme.spacing(3)
    }
  },
  typography: {}
}));

export const DataTableCell: FC<DataTableCellProps> = props => {
  const {className, width = '100px', fullWidth = false, title, align = 'left', children} = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} style={{flex: `${fullWidth ? `1 1 ${width}` : `0 0 ${width}`}`, textAlign: align}} title={title}>
      {children}
    </div>
  );
};
