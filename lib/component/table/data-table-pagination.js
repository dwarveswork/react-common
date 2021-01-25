import { IconButton, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, ChevronRight, FirstPage, LastPage } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { DataTableNote } from './data-table-note';
const useStyles = makeStyles((theme) => createStyles({
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
export const DataTablePagination = props => {
    const { className, pageIndex, pageSize, pageCount, totalCount, onPageChange, totalLabel } = props;
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
    const onPageSizeChange = (e) => {
        onPageChange(1, Number(e.target.value));
    };
    return (React.createElement("div", { className: clsx(classes.root, className) },
        React.createElement(Select, { className: classes.pageSize, value: pageSize, onChange: onPageSizeChange }, [10, 20, 50].map(n => (React.createElement(MenuItem, { key: n, value: n }, n)))),
        React.createElement(DataTableNote, { className: classes.note, pageable: true, totalCount: totalCount, pageIndex: pageIndex, pageSize: pageSize, pageCount: pageCount, totalLabel: totalLabel }),
        React.createElement(IconButton, { onClick: onFirstClick, disabled: pageIndex <= 1 },
            React.createElement(FirstPage, null)),
        React.createElement(IconButton, { onClick: onPreviousClick, disabled: pageIndex <= 1 },
            React.createElement(ChevronLeft, null)),
        React.createElement(IconButton, { onClick: onNextClick, disabled: pageCount <= 1 || pageIndex === pageCount },
            React.createElement(ChevronRight, null)),
        React.createElement(IconButton, { onClick: onLastClick, disabled: pageCount <= 1 || pageIndex === pageCount },
            React.createElement(LastPage, null))));
};
//# sourceMappingURL=data-table-pagination.js.map