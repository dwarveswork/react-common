import { Drawer, Hidden } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { Sidebar } from './sidebar';
const useStyles = makeStyles(theme => ({
    root: {},
    container: {
        width: '240px'
    }
}));
export const SidebarDrawer = props => {
    const { className, open, routes, onClosed } = props;
    const classes = useStyles();
    const container = window !== undefined ? () => window.document.body : undefined;
    return (React.createElement("div", { className: clsx(classes.root, className) },
        React.createElement(Hidden, { mdUp: true, implementation: 'css' },
            React.createElement(Drawer, { container: container, variant: 'temporary', open: open, onClose: onClosed, classes: { paper: classes.container }, ModalProps: { keepMounted: true } },
                React.createElement(Sidebar, { routes: routes, onClosed: onClosed }))),
        React.createElement(Hidden, { smDown: true, implementation: 'css' },
            React.createElement(Drawer, { classes: { paper: classes.container }, variant: 'permanent', open: true },
                React.createElement(Sidebar, { routes: routes })))));
};
//# sourceMappingURL=sidebar-drawer.js.map