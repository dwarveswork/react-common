import { Fade, IconButton, Snackbar, SnackbarContent, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CheckCircle, Close, Error, NotificationImportant, Warning } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
export var PromptSeverity;
(function (PromptSeverity) {
    PromptSeverity["INFO"] = "info";
    PromptSeverity["SUCCESS"] = "success";
    PromptSeverity["WARNING"] = "warning";
    PromptSeverity["ERROR"] = "error";
})(PromptSeverity || (PromptSeverity = {}));
const useStyles = makeStyles((theme) => createStyles({
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
export const Prompt = props => {
    const classes = useStyles();
    const { vertical, horizontal, onClose, state } = props;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        onClose(event, reason);
    };
    const icons = {
        [PromptSeverity.INFO]: React.createElement(NotificationImportant, { fontSize: 'small' }),
        [PromptSeverity.SUCCESS]: React.createElement(CheckCircle, { fontSize: 'small' }),
        [PromptSeverity.WARNING]: React.createElement(Warning, { fontSize: 'small' }),
        [PromptSeverity.ERROR]: React.createElement(Error, { fontSize: 'small' })
    };
    return (React.createElement(Snackbar, { className: classes.root, anchorOrigin: { vertical, horizontal }, autoHideDuration: 6000, TransitionComponent: Fade, open: state.open, onClose: handleClose },
        React.createElement(SnackbarContent, { className: clsx(classes.content, classes[state.severity]), message: React.createElement(Typography, { className: classes.message, variant: 'body2' },
                icons[state.severity],
                state.message), action: React.createElement(IconButton, { size: 'small', color: 'inherit', onClick: handleClose },
                React.createElement(Close, { fontSize: 'small' })) })));
};
//# sourceMappingURL=prompt.js.map