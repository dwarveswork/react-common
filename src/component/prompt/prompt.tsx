import {Fade, IconButton, Snackbar, SnackbarContent, Typography} from '@material-ui/core';
import {SnackbarCloseReason} from '@material-ui/core/Snackbar/Snackbar';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {CheckCircle, Close, Error, NotificationImportant, Warning} from '@material-ui/icons';
import clsx from 'clsx';
import React, {FC, ReactNode} from 'react';

export enum PromptSeverity {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface PromptProps {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  state: PromptState;
  onClose: (event: React.SyntheticEvent<any>, reason?: SnackbarCloseReason) => void;
}

export interface PromptState {
  open: boolean;
  severity: PromptSeverity;
  message: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  content: {
    color: theme.palette.common.white,
    flexWrap: 'nowrap'
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 500,
    wordBreak: 'break-all',
    '& > svg': {
      marginRight: theme.spacing(1.5)
    }
  },
  info: {
    background: theme.palette.primary.dark
  },
  success: {
    background: theme.palette.success.dark
  },
  warning: {
    background: theme.palette.warning.dark
  },
  error: {
    background: theme.palette.error.dark
  }
}));

export const Prompt: FC<PromptProps> = props => {

  const classes = useStyles();
  const {vertical, horizontal, onClose, state} = props;

  const handleClose = (event: React.SyntheticEvent<any>, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose(event, reason);
  };

  const icons: Record<PromptSeverity, ReactNode> = {
    [PromptSeverity.INFO]: <NotificationImportant fontSize={'small'}/>,
    [PromptSeverity.SUCCESS]: <CheckCircle fontSize={'small'}/>,
    [PromptSeverity.WARNING]: <Warning fontSize={'small'}/>,
    [PromptSeverity.ERROR]: <Error fontSize={'small'}/>
  };

  return (
    <Snackbar className={classes.root} anchorOrigin={{vertical, horizontal}} autoHideDuration={6000} TransitionComponent={Fade}
              open={state.open} onClose={handleClose}>
      <SnackbarContent className={clsx(classes.content, classes[state.severity])}
                       message={<Typography className={classes.message} variant={'body2'}>{icons[state.severity]}{state.message}</Typography>}
                       action={<IconButton size={'small'} color={'inherit'} onClick={handleClose}><Close fontSize='small'/></IconButton>}/>
    </Snackbar>
  );
};