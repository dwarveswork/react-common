import { CircularProgress, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Refresh } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DataTableCell, DEFAULT_CELL_WIDTH } from './data-table-cell';
import { DataTableNote } from './data-table-note';
import { DataTablePagination } from './data-table-pagination';
const useStyles = makeStyles((theme) => createStyles({
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
export function DataTable(props) {
    const { className, columns, pageable, data, selectable, onSelected, onLoad, onPageChange, loading: externalLoading, errorLabel = 'FAILED TO LOAD DATA', loadingLabel = 'LOADING...', emptyLabel = 'NO DATA', totalLabel } = props;
    const classes = useStyles();
    const mounted = useRef(true);
    const table = useRef(null);
    const [selection, setSelection] = useState(-1);
    const [loading, setLoading] = useState(externalLoading !== undefined ? externalLoading : false);
    const [error, setError] = useState(false);
    const rowProps = useMemo(() => {
        if (table.current && columns.filter(c => c.flex).length === 0) {
            const styles = getComputedStyle(table.current);
            const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
            const spacer = table.current.clientWidth - paddingX - columns.reduce((pv, cv) => {
                const width = cv.width || DEFAULT_CELL_WIDTH;
                return pv + width;
            }, 0);
            return { stretch: false, spacer };
        }
        return { stretch: true, spacer: 0 };
    }, [table, columns]);
    const generateDataSource = (data) => {
        if (data === undefined) {
            data = pageable ? { data: [], pageIndex: -1, pageSize: 10, pageCount: -1, totalCount: 0 } : [];
        }
        if (data instanceof Array) {
            return {
                data: data,
                totalCount: data.length,
                pageable: false,
                pageIndex: -1,
                pageSize: -1,
                pageCount: -1
            };
        }
        else {
            return {
                data: data.data,
                totalCount: data.totalCount,
                pageable: true,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                pageCount: data.pageCount
            };
        }
    };
    const dataSource = useMemo(() => {
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
    const onPageChangeClick = async (pageIndex, pageSize) => {
        clearSelection();
        showLoading();
        await onPageChange(pageIndex, pageSize).catch(() => mounted.current && setError(true));
        hideLoading();
    };
    const onRowSelected = (data, index) => {
        setSelection(index);
        selectable && onSelected && onSelected(data);
    };
    const clearSelection = () => {
        mounted.current && setSelection(-1);
        selectable && onSelected && onSelected(undefined);
    };
    return (React.createElement("div", { className: clsx(classes.root, className), ref: table },
        React.createElement("div", { className: classes.content },
            React.createElement("div", { className: classes.header },
                React.createElement("div", { className: clsx(classes.row, rowProps.stretch && classes.stretchRow) },
                    columns.map((c, i) => (React.createElement(DataTableCell, { key: i, className: clsx(classes.cell, classes.headerTypography), width: c.width, flex: c.flex, title: c.description, align: c.align }, c.title || c.field))),
                    rowProps.spacer > 0 && (React.createElement(DataTableCell, { className: classes.cell, width: rowProps.spacer })))),
            React.createElement("div", { className: classes.body }, error
                ? (React.createElement("div", { className: clsx(classes.row, classes.stretchRow) },
                    React.createElement(DataTableCell, { className: classes.errorTypography, flex: 'auto', align: 'center' }, errorLabel)))
                : (loading && dataSource.data.length === 0
                    ? (React.createElement("div", { className: clsx(classes.row, classes.stretchRow) },
                        React.createElement(DataTableCell, { className: classes.emptyTypography, flex: 'auto', align: 'center' }, loadingLabel)))
                    : (dataSource.data.length === 0
                        ? (React.createElement("div", { className: clsx(classes.row, classes.stretchRow) },
                            React.createElement(DataTableCell, { className: classes.emptyTypography, flex: 'auto', align: 'center' }, emptyLabel)))
                        : (dataSource.data.map((d, i) => (React.createElement("div", { key: i, className: clsx(classes.row, classes.bodyRow, rowProps.stretch && classes.stretchRow, selectable && selection === i && classes.selectedRow), onClick: () => onRowSelected(d, i) },
                            columns.map((c, j) => (React.createElement(DataTableCell, { key: j, className: i === dataSource.data.length - 1 ? undefined : classes.cell, width: c.width, flex: c.flex, align: c.align }, c.formatter ? c.formatter(d) : (c.field ? d[c.field] : '')))),
                            rowProps.spacer > 0 && (React.createElement(DataTableCell, { className: i === dataSource.data.length - 1 ? undefined : classes.cell, width: rowProps.spacer })))))))))),
        React.createElement("div", { className: classes.footer },
            dataSource.pageable
                ? (React.createElement(DataTablePagination, { className: classes.pagination, pageIndex: dataSource.pageIndex, pageSize: dataSource.pageSize, pageCount: dataSource.pageCount, totalCount: dataSource.totalCount, onPageChange: onPageChangeClick, totalLabel: totalLabel }))
                : (React.createElement(DataTableNote, { pageable: dataSource.pageable, pageIndex: dataSource.pageIndex, pageSize: dataSource.pageSize, pageCount: dataSource.pageCount, totalCount: dataSource.totalCount, totalLabel: totalLabel })),
            onLoad && (React.createElement(IconButton, { onClick: onReloadClick },
                React.createElement(Refresh, null)))),
        loading && (React.createElement("div", { className: classes.loading },
            React.createElement(CircularProgress, null)))));
}
//# sourceMappingURL=data-table.js.map