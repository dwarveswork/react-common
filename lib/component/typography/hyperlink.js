import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
const useStyles = makeStyles((theme) => createStyles({
    root: {
        display: 'inline-block',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
}));
export const Hyperlink = props => {
    const { className, label, onClick } = props;
    const classes = useStyles();
    return (React.createElement(Typography, { className: clsx(classes.root, className), variant: 'body2', component: 'span', color: 'secondary', onClick: onClick }, label));
};
//# sourceMappingURL=hyperlink.js.map