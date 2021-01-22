import {CircularProgress, IconButton} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Refresh} from '@material-ui/icons';
import clsx from 'clsx';
import React, {ReactElement, ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import {CommonComponentProps} from '../common-component';
import {DataTableCell, DEFAULT_CELL_WIDTH} from './data-table-cell';
import {DataTableNote} from './data-table-note';
import {DataTablePagination} from './data-table-pagination';

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
    alignItems: 'center',
    width: 'fit-content'
  },
  stretchRow: {
    width: 'auto'
  },
  bodyRow: {
    '&:hover': {
      background: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
    }
  },
  selectedRow: {
    background: `${theme.palette.secondary.main}40`,
    '&:hover': {
      background: `${theme.palette.secondary.main}40`
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
    background: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export interface DataTableColumnConfig<T extends {}> {
  title: string;
  field?: keyof T;
  description?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (data: T) => ReactNode;
  width?: number;
  flex?: string;
}

export interface DataTableRowConfig<T extends {}> {
  classProvider?: (data: T, index: number) => string;
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
  data: DataListSource<T> | undefined;
  onLoad?: () => Promise<void>;
  selectable?: boolean;
  onSelected?: (data?: T) => void;
} | {
  pageable: true;
  data: DataPageSource<T> | undefined;
  onLoad: (pageIndex?: number, pageSize?: number) => Promise<void>;
  onPageChange: (pageIndex: number, pageSize: number) => Promise<void>;
}) & DataTableCommonProps<T>;

interface DataTableRowProps<T> {
  stretch: boolean;
  spacer: number;
}

export function DataTable<T extends {}>(props: DataTableProps<T>): ReactElement<any, any> | null {
  const {
    // @ts-ignore
    className, columns, pageable, data, selectable, onSelected, onLoad, onPageChange, loading: externalLoading,
    errorLabel = 'FAILED TO LOAD DATA', loadingLabel = 'LOADING...', emptyLabel = 'NO DATA', totalLabel
  } = props;

  const classes = useStyles();

  const mounted = useRef<boolean>(true);
  const table = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(externalLoading !== undefined ? externalLoading : false);
  const [error, setError] = useState<boolean>(false);

  const rowProps = useMemo<DataTableRowProps<T>>(() => {
    if (table.current && columns.filter(c => c.flex).length === 0) {
      const styles = getComputedStyle(table.current);
      const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const spacer = table.current.clientWidth - paddingX - columns.reduce((pv, cv) => {
        const width = cv.width || DEFAULT_CELL_WIDTH;
        return pv + width;
      }, 0);
      return {stretch: false, spacer};
    }
    return {stretch: true, spacer: 0};
  }, [table, columns]);

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
    setSelection(index);
    selectable && onSelected && onSelected(data);
  };

  const clearSelection = () => {
    mounted.current && setSelection(-1);
    selectable && onSelected && onSelected(undefined);
  };

  return (
    <div className={clsx(classes.root, className)} ref={table}>
      <div className={classes.content}>
        <div className={classes.header}>
          <div className={clsx(classes.row, rowProps.stretch && classes.stretchRow)}>
            {columns.map((c, i) => (
              <DataTableCell key={i} className={clsx(classes.cell, classes.headerTypography)} width={c.width} flex={c.flex}
                             title={c.description} align={c.align}>
                {c.title || c.field}
              </DataTableCell>
            ))}
            {rowProps.spacer > 0 && (<DataTableCell className={classes.cell} width={rowProps.spacer}/>)}
          </div>
        </div>
        <div className={classes.body}>
          {error
            ? (<div className={clsx(classes.row, classes.stretchRow)}>
              <DataTableCell className={classes.errorTypography} flex={'auto'} align={'center'}>{errorLabel}</DataTableCell>
            </div>)
            : (loading && dataSource.data.length === 0
                ? (<div className={clsx(classes.row, classes.stretchRow)}>
                    <DataTableCell className={classes.emptyTypography} flex={'auto'} align={'center'}>{loadingLabel}</DataTableCell>
                  </div>
                )
                : (dataSource.data.length === 0
                  ? (<div className={clsx(classes.row, classes.stretchRow)}>
                      <DataTableCell className={classes.emptyTypography} flex={'auto'} align={'center'}>{emptyLabel}</DataTableCell>
                    </div>
                  )
                  : (dataSource.data.map((d, i) => (
                    <div key={i}
                         className={clsx(classes.row, classes.bodyRow, rowProps.stretch && classes.stretchRow, selectable && selection === i && classes.selectedRow)}
                         onClick={() => onRowSelected(d, i)}>
                      {columns.map((c, j) => (
                        <DataTableCell key={j} className={i === dataSource.data.length - 1 ? undefined : classes.cell} width={c.width} flex={c.flex}
                                       align={c.align}>
                          {c.formatter ? c.formatter(d) : (c.field ? d[c.field] : '')}
                        </DataTableCell>
                      ))}
                      {rowProps.spacer > 0 && (
                        <DataTableCell className={i === dataSource.data.length - 1 ? undefined : classes.cell} width={rowProps.spacer}/>)}
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