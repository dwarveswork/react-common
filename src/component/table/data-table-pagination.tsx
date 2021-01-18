import {IconButton, MenuItem, Select} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {ChevronLeft, ChevronRight, FirstPage, LastPage} from '@material-ui/icons';
import clsx from 'clsx';
import React, {FC} from 'react';
import {CommonComponentProps} from '../common-component';
import {DataTableNote} from './data-table-note';

export interface DataTablePaginationProps extends CommonComponentProps {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  onPageChange: (pageIndex: number, pageSize: number) => void | Promise<void>;
  totalLabel?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 'auto'
  },
  pageSize: {
    fontSize: '0.8125rem',
    marginRight: theme.spacing(3)
  },
  note: {}
}));

export const DataTablePagination: FC<DataTablePaginationProps> = props => {

  const {className, pageIndex, pageSize, pageCount, totalCount, onPageChange, totalLabel} = props;
  const classes = useStyles();

  const onFirstClick = () => {
    onPageChange(1, pageSize);
  };

  const onPreviousClick = () => {
    onPageChange(pageIndex - 1, pageSize);
  };

  const onNextClick = () => {
    onPageChange(pageIndex + 1, pageSize);
  };

  const onLastClick = () => {
    onPageChange(pageCount, pageSize);
  };

  const onPageSizeChange = (e: React.ChangeEvent<{name?: string; value: unknown}>) => {
    onPageChange(1, Number(e.target.value));
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Select className={classes.pageSize} value={pageSize} onChange={onPageSizeChange}>
        {[10, 20, 50].map(n => (
          <MenuItem key={n} value={n}>{n}</MenuItem>
        ))}
      </Select>
      <DataTableNote className={classes.note} pageable={true} totalCount={totalCount} pageIndex={pageIndex} pageSize={pageSize} pageCount={pageCount}
                     totalLabel={totalLabel}/>
      <IconButton onClick={onFirstClick} disabled={pageIndex <= 1}><FirstPage/></IconButton>
      <IconButton onClick={onPreviousClick} disabled={pageIndex <= 1}><ChevronLeft/></IconButton>
      <IconButton onClick={onNextClick} disabled={pageIndex === pageCount}><ChevronRight/></IconButton>
      <IconButton onClick={onLastClick} disabled={pageIndex === pageCount}><LastPage/></IconButton>
    </div>
  );
};