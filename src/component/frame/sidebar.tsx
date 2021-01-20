import {Divider, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React, {FC} from 'react';
import {useApp} from '../app';
import {CommonComponentProps} from '../common-component';
import {RouteComponentConfig, useRouter} from '../router';

export interface SidebarProps extends CommonComponentProps {
  routes: RouteComponentConfig[];
  onClosed?: () => void;
}

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

export const Sidebar: FC<SidebarProps> = props => {

  const {className, routes, onClosed} = props;
  const classes = useStyles();
  const router = useRouter();
  const app = useApp();

  const onRouteSelect = (route: RouteComponentConfig) => {
    router.navigate(route);
    onClosed && onClosed();
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.toolbar}>
        <Typography variant={'h6'} className={classes.name}>{app.name}</Typography>
        <Typography variant={'caption'} className={classes.version}>{app.version}</Typography>
      </div>
      <Divider/>
      <List>
        {routes.filter(route => route.menu).map((route) => (
          <ListItem key={route.key} className={classes.menuItem} button component={'a'} disableGutters={true}
                    selected={router.selection?.key === route.key} onClick={() => onRouteSelect(route)}>
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.title}/>
          </ListItem>
        ))}
      </List>
    </div>
  );
};