import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
const useStyles = makeStyles((theme) => createStyles({
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
export const DataTableNote = props => {
    const { className, pageable, totalCount, pageIndex, pageSize, pageCount, totalLabel = 'Total' } = props;
    const classes = useStyles();
    const formatStart = () => {
        return pageIndex < 1 || pageSize < 0 ? 'N/A' : (pageIndex - 1) * pageSize + 1 + '';
    };
    const formatEnd = () => {
        let end = pageIndex < 1 || pageSize < 0 ? 'N/A' : pageIndex * pageSize;
        return (end > totalCount ? totalCount : end) + '';
    };
    const formatTotal = () => {
        return totalCount < 0 ? 'N/A' : totalCount + '';
    };
    return (React.createElement("span", { className: clsx(classes.root, className) },
        pageable && (React.createElement(React.Fragment, null,
            React.createElement("span", { className: classes.start }, formatStart()),
            React.createElement("span", { className: classes.to }, "-"),
            React.createElement("span", { className: classes.end }, formatEnd()))),
        React.createElement("span", { className: classes.totalCountLabel }, totalLabel),
        React.createElement("span", { className: classes.totalCount }, formatTotal())));
};
//# sourceMappingURL=data-table-note.js.map