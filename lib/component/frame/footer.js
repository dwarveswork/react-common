import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
const useStyles = makeStyles(theme => ({
    root: {}
}));
export const Footer = props => {
    const { className } = props;
    const classes = useStyles();
    return (React.createElement("div", { className: clsx(classes.root, className) }));
};
//# sourceMappingURL=footer.js.map