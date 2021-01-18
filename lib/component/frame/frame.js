import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Routes } from '../router';
import { Footer } from './footer';
import { Header } from './header';
import { SidebarDrawer } from './sidebar-drawer';
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    navbar: {
        flex: '0 0 240px',
        height: '100vh',
        [theme.breakpoints.down('sm')]: {
            flexBasis: 0
        }
    },
    main: {
        flex: 'auto',
        width: 'calc(100vw - 240px)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        flex: 'none'
    },
    content: {
        flex: 'auto',
        padding: `${theme.spacing(3)}px`,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0
        },
        overflow: 'auto'
    },
    footer: {
        flex: 'none'
    }
}));
export const Frame = props => {
    const { className, routes, headerActions } = props;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (React.createElement("div", { className: clsx(classes.root, className) },
        React.createElement(SidebarDrawer, { className: classes.navbar, open: open, routes: routes, onClosed: () => setOpen(false) }),
        React.createElement("div", { className: classes.main },
            React.createElement(Header, { className: classes.header, onMenuClicked: () => setOpen(true) }, headerActions),
            React.createElement("main", { className: classes.content },
                React.createElement(Routes, { routes: routes })),
            React.createElement(Footer, { className: classes.footer }))));
};
//# sourceMappingURL=frame.js.map