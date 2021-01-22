import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { useRouter } from '../router';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    menu: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    title: {
        flex: 'auto'
    }
}));
export const Header = props => {
    const { className, children, onMenuClicked, color } = props;
    const classes = useStyles();
    const router = useRouter();
    return (React.createElement(AppBar, { position: 'relative', color: color, className: clsx(classes.root, className) },
        React.createElement(Toolbar, null,
            React.createElement(IconButton, { color: 'inherit', edge: 'start', className: classes.menu, onClick: onMenuClicked },
                React.createElement(Menu, null)),
            React.createElement(Typography, { variant: 'h6', noWrap: true, className: classes.title }, router.selection?.title),
            children)));
};
//# sourceMappingURL=header.js.map