import { IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
const useStyles = makeStyles((theme) => createStyles({
    root: {
        position: 'relative',
        '&:before': {
            content: '\"\"',
            position: 'absolute',
            top: '-1px',
            right: '-1px',
            borderWidth: `0 ${theme.spacing(3)}px ${theme.spacing(3)}px 0`,
            borderStyle: 'solid',
            borderColor: `${theme.palette.grey[400]} #fff`
        }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        height: '160px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '4px'
    },
    extension: {
        textTransform: 'uppercase',
        fontWeight: 500,
        paddingBottom: theme.spacing(3)
    },
    name: {
        width: '120px',
        paddingTop: theme.spacing(0.5)
    },
    delete: {
        position: 'absolute',
        right: '-8px',
        top: '120px',
        color: theme.palette.grey[400],
        '&:hover': {
            color: theme.palette.error.main
        }
    }
}));
export const FormFilePreview = props => {
    const { className, file, onDelete } = props;
    const classes = useStyles();
    return (React.createElement("div", { className: clsx(classes.root, className) },
        React.createElement("div", { className: classes.content },
            React.createElement(Typography, { className: classes.extension, variant: 'subtitle2', color: 'textSecondary', noWrap: true }, file.extension)),
        React.createElement(Typography, { className: classes.name, variant: 'body2', color: 'textSecondary', noWrap: true }, file.name),
        React.createElement(IconButton, { className: classes.delete, onClick: onDelete },
            React.createElement(Delete, { fontSize: 'small' }))));
};
//# sourceMappingURL=form-file-preview.js.map