import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React, {FC, ReactNode, useState} from 'react';
import {CommonComponentProps} from '../common-component';
import {RouteComponentConfig, Routes} from '../router';
import {Footer} from './footer';
import {Header} from './header';
import {SidebarDrawer} from './sidebar-drawer';

export interface FrameProps extends CommonComponentProps {
  routes: RouteComponentConfig[];
  headerActions?: ReactNode;
}

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

export const Frame: FC<FrameProps> = props => {

  const {className, routes, headerActions} = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={clsx(classes.root, className)}>
      <SidebarDrawer className={classes.navbar} open={open} routes={routes} onClosed={() => setOpen(false)}/>
      <div className={classes.main}>
        <Header className={classes.header} onMenuClicked={() => setOpen(true)}>{headerActions}</Header>
        <main className={classes.content}>
          <Routes routes={routes}/>
        </main>
        <Footer className={classes.footer}/>
      </div>
    </div>
  );
};