import {Drawer, Hidden} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React, {FC} from 'react';
import {Sidebar, SidebarProps} from './sidebar';

export interface SidebarDrawerProps extends SidebarProps {
  open: boolean;
  onClosed: () => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%'
  },
  container: {
    width: '240px'
  }
}));

export const SidebarDrawer: FC<SidebarDrawerProps> = props => {

  const {className, open, routes, onClosed} = props;
  const classes = useStyles();
  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <div className={clsx(classes.root, className)}>
      <Hidden mdUp implementation='css'>
        <Drawer container={container} variant='temporary' open={open} onClose={onClosed}
                classes={{paper: classes.container}} ModalProps={{keepMounted: true}}>
          <Sidebar routes={routes}/>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='css'>
        <Drawer classes={{paper: classes.container}} variant='permanent' open={true}>
          <Sidebar routes={routes}/>
        </Drawer>
      </Hidden>
    </div>
  );
};