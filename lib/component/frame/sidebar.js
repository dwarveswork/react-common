import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import { useApp } from '../app';
import { useRouter } from '../router';
const useStyles = makeStyles(theme => ({
    root: {},
    toolbar: {
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingLeft: `${theme.spacing(3)}px`
    },
    name: {},
    version: {},
    menuItem: {
        padding: `${theme.spacing()}px ${theme.spacing(3)}px`
    }
}));
export const Sidebar = props => {
    const { className, routes, onClosed } = props;
    const classes = useStyles();
    const router = useRouter();
    const app = useApp();
    const onRouteSelect = (route) => {
        router.navigate(route);
        onClosed && onClosed();
    };
    return (React.createElement("div", { className: clsx(classes.root, className) },
        React.createElement("div", { className: classes.toolbar },
            React.createElement(Typography, { variant: 'h6', className: classes.name }, app.name),
            React.createElement(Typography, { variant: 'caption', className: classes.version }, app.version)),
        React.createElement(Divider, null),
        React.createElement(List, null, routes.filter(route => route.menu).map((route) => (React.createElement(ListItem, { key: route.key, className: classes.menuItem, button: true, component: 'a', disableGutters: true, selected: router.selection?.key === route.key, onClick: () => onRouteSelect(route) },
            React.createElement(ListItemIcon, null, route.icon),
            React.createElement(ListItemText, { primary: route.title })))))));
};
//# sourceMappingURL=sidebar.js.map