import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, {FC} from 'react';
import {CommonComponentProps} from '../common-component';
import {useRouter} from '../router';

export interface HeaderProps extends CommonComponentProps {
  onMenuClicked: () => void;
}

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

export const Header: FC<HeaderProps> = props => {

  const {className, children, onMenuClicked} = props;
  const classes = useStyles();
  const router = useRouter();

  return (
    <AppBar position={'relative'} className={clsx(classes.root, className)}>
      <Toolbar>
        <IconButton color={'inherit'} edge={'start'} className={classes.menu} onClick={onMenuClicked}>
          <Menu/>
        </IconButton>
        <Typography variant={'h6'} noWrap className={classes.title}>{router.selection.title}</Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
};