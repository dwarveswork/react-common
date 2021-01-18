import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {FC} from 'react';
import {CommonComponentProps} from '../common-component';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginRight: theme.spacing()
  },
  totalCount: {
    fontWeight: 500
  },
  totalCountLabel: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    marginRight: theme.spacing()
  },
  start: {
    fontWeight: 500
  },
  to: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    margin: `0 ${theme.spacing()}px`
  },
  end: {
    fontWeight: 500,
    marginRight: theme.spacing()
  }
}));

export interface DataTableNoteProps extends CommonComponentProps {
  pageable: boolean;
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalLabel?: string;
}

export const DataTableNote: FC<DataTableNoteProps> = props => {
  const {className, pageable, totalCount, pageIndex, pageSize, pageCount, totalLabel = 'Total'} = props;
  const classes = useStyles();

  const formatStart = (): string => {
    return pageIndex < 1 || pageSize < 0 ? 'N/A' : (pageIndex - 1) * pageSize + 1 + '';
  };

  const formatEnd = (): string => {
    let end = pageIndex < 1 || pageSize < 0 ? 'N/A' : pageIndex * pageSize;
    return (end > totalCount ? totalCount : end) + '';
  };

  const formatTotal = (): string => {
    return totalCount < 0 ? 'N/A' : totalCount + '';
  };

  return (
    <span className={clsx(classes.root, className)}>
      {pageable && (
        <>
          <span className={classes.start}>{formatStart()}</span>
          <span className={classes.to}>-</span>
          <span className={classes.end}>{formatEnd()}</span>
        </>
      )}
      <span className={classes.totalCountLabel}>{totalLabel}</span>
      <span className={classes.totalCount}>{formatTotal()}</span>
    </span>
  );
};