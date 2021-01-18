import {CircularProgress, IconButton} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Refresh} from '@material-ui/icons';
import clsx from 'clsx';
import React, {ReactComponentElement, ReactElement, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {CommonComponentProps} from '../common-component';
import {DataTableCell} from './data-table-cell';
import {DataTableNote} from './data-table-note';
import {DataTablePagination} from './data-table-pagination';

export interface DataTableColumnConfig<T extends {}> {
  field?: keyof T;
  title?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  component?: ReactComponentElement<any>;
  formatter?: (data: T, key?: keyof T) => ReactNode;
  width?: string;
}

export interface DataTableCommonProps<T extends {}> extends CommonComponentProps {
  columns: DataTableColumnConfig<T>[];
  loading?: boolean;
  errorLabel?: string;
  loadingLabel?: string;
  emptyLabel?: string;
  totalLabel?: string;
}

export type DataListSource<T> = T[];

export interface DataPageSource<T> {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  data: T[];
}

export interface DataSource<T> {
  data: T[];
  totalCount: number;
  pageable: boolean;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
}

export type DataTableProps<T extends {}> = ({
  pageable: false;
  data?: DataListSource<T>;
  onLoad?: () => Promise<void>;
  selectable?: boolean;
  onSelected?: (data?: T) => void;
} | {
  pageable: true;
  data?: DataPageSource<T>;
  onLoad: (pageIndex?: number, pageSize?: number) => Promise<void>;
  onPageChange: (pageIndex: number, pageSize: number) => Promise<void>;
}) & DataTableCommonProps<T>;

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    position: 'relative',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: `4px`,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto',
    overflowY: 'auto'
  },
  header: {
    flex: 'none'
  },
  body: {
    flex: 'auto'
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    flex: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: `${theme.spacing()}px 0`
  },
  pagination: {
    flex: 'auto'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyRow: {
    '&:hover > *': {
      background: theme.palette.grey[100]
    }
  },
  selectedRow: {
    background: theme.palette.grey[300],
    '&:hover > *': {
      background: 'inherit'
    }
  },
  cell: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  headerTypography: {
    color: theme.palette.text.secondary,
    fontWeight: 500
  },
  errorTypography: {
    color: theme.palette.error.main
  },
  emptyTypography: {
    color: theme.palette.text.secondary
  },
  loading: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#f5f5f599',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export function DataTable<T extends {}>(props: DataTableProps<T>): ReactElement<any, any> | null {
  const {
    // @ts-ignore
    className, columns, pageable, data, selectable, onSelected, onLoad, onPageChange, loading: externalLoading,
    errorLabel = 'FAILED TO LOAD DATA', loadingLabel = 'LOADING...', emptyLabel = 'NO DATA', totalLabel
  } = props;
  const classes = useStyles();

  const mounted = useRef<boolean>(true);
  const [selection, setSelection] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(externalLoading !== undefined ? externalLoading : false);
  const [error, setError] = useState<boolean>(false);

  const generateDataSource = (data: DataListSource<T> | DataPageSource<T> | undefined): DataSource<T> => {
    if (data === undefined) {
      data = pageable ? {data: [], pageIndex: -1, pageSize: 10, pageCount: -1, totalCount: 0} : [];
    }
    if (data instanceof Array) {
      return {
        data: data as DataListSource<T>,
        totalCount: data.length,
        pageable: false,
        pageIndex: -1,
        pageSize: -1,
        pageCount: -1
      };
    } else {
      return {
        data: (data as DataPageSource<T>).data,
        totalCount: data.totalCount,
        pageable: true,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
        pageCount: data.pageCount
      };
    }
  };

  const dataSource = useMemo<DataSource<T>>(() => {
    return generateDataSource(data);
  }, [data]);

  useEffect(() => {
    if (externalLoading !== undefined) {
      mounted.current && setLoading(externalLoading);
    }
  }, [externalLoading]);

  useEffect(() => {
    clearSelection();
  }, [data]);

  useEffect(() => {
    if (externalLoading === undefined && onLoad) {
      showLoading();
      onLoad().catch(() => setError(true)).finally(() => {
        hideLoading();
      });
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  const showLoading = () => {
    mounted.current && externalLoading === undefined && setLoading(true);
  };

  const hideLoading = () => {
    mounted.current && externalLoading === undefined && setLoading(false);
  };

  const onReloadClick = async () => {
    clearSelection();
    if (onLoad) {
      showLoading();
      await onLoad(dataSource.pageIndex, dataSource.pageSize).catch(() => mounted.current && setError(true));
      hideLoading();
    }
  };

  const onPageChangeClick = async (pageIndex: number, pageSize: number) => {
    clearSelection();
    showLoading();
    await onPageChange(pageIndex, pageSize).catch(() => mounted.current && setError(true));
    hideLoading();
  };

  const onRowSelected = (data: T, index: number) => {
    console.log(index);
    setSelection(index);
    selectable && onSelected && onSelected(data);
  };

  const clearSelection = () => {
    mounted.current && setSelection(-1);
    selectable && onSelected && onSelected(undefined);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={classes.row}>
            {columns.map((c, i) => (
              <DataTableCell key={i} className={clsx(classes.cell, classes.headerTypography)} width={c.width} fullWidth={i === columns.length - 1}
                             title={c.description} align={c.align}>
                {c.title || c.field}
              </DataTableCell>
            ))}
          </div>
        </div>
        <div className={classes.body}>
          {error
            ? (<div className={classes.row}>
              <DataTableCell className={classes.errorTypography} fullWidth align={'center'}>{errorLabel}</DataTableCell>
            </div>)
            : (loading && dataSource.data.length === 0
                ? (<div className={classes.row}>
                    <DataTableCell className={classes.emptyTypography} fullWidth align={'center'}>{loadingLabel}</DataTableCell>
                  </div>
                )
                : (dataSource.data.length === 0
                  ? (<div className={classes.row}>
                      <DataTableCell className={classes.emptyTypography} fullWidth align={'center'}>{emptyLabel}</DataTableCell>
                    </div>
                  )
                  : (dataSource.data.map((d, i) => (
                    <div key={i} className={clsx(classes.row, classes.bodyRow, selectable && selection === i && classes.selectedRow)}
                         onClick={() => onRowSelected(d, i)}>
                      {columns.map((c, j) => (
                        <DataTableCell key={j} className={i === dataSource.data.length - 1 ? undefined : classes.cell} width={c.width}
                                       fullWidth={j === columns.length - 1}
                                       align={c.align}>
                          {c.formatter ? c.formatter(d, c.field) : (c.field ? d[c.field] : '')}
                        </DataTableCell>
                      ))}
                    </div>
                  ))))
            )}
        </div>
      </div>
      <div className={classes.footer}>
        {dataSource.pageable
          ? (<DataTablePagination className={classes.pagination} pageIndex={dataSource.pageIndex} pageSize={dataSource.pageSize}
                                  pageCount={dataSource.pageCount} totalCount={dataSource.totalCount} onPageChange={onPageChangeClick}
                                  totalLabel={totalLabel}/>)
          : (<DataTableNote pageable={dataSource.pageable} pageIndex={dataSource.pageIndex} pageSize={dataSource.pageSize}
                            pageCount={dataSource.pageCount} totalCount={dataSource.totalCount} totalLabel={totalLabel}/>)
        }
        {onLoad && (<IconButton onClick={onReloadClick}><Refresh/></IconButton>)}
      </div>
      {loading && (
        <div className={classes.loading}>
          <CircularProgress/>
        </div>
      )}
    </div>
  );
}