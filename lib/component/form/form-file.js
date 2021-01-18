import { FormControl, FormHelperText, InputLabel } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CloudUploadOutlined } from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';
import { Field } from 'react-final-form';
import { FormFilePreview } from './form-file-preview';
const useStyles = makeStyles((theme) => createStyles({
    root: {},
    label: {
        position: 'initial',
        transform: 'none',
        marginBottom: theme.spacing()
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: -theme.spacing(2)
    },
    card: {
        margin: theme.spacing(2)
    },
    input: {
        display: 'none'
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '120px',
        height: '160px',
        border: `1px dashed ${theme.palette.divider}`,
        cursor: 'pointer',
        color: theme.palette.primary.light
    },
    buttonLabel: {
        marginTop: theme.spacing()
    },
    error: {
        marginTop: theme.spacing()
    }
}));
export const FormFile = props => {
    const { className, name, label, required, validate, maxSize = -1, onExceededMaxSizeFileSelected, accept = '*/*', multiple = false, chooseFileLabel = 'Choose files', ...others } = props;
    const classes = useStyles();
    const getDefaultValidator = () => {
        const requiredValidator = (value) => value && value.length > 0 ? undefined : 'Required';
        if (validate && required) {
            return validate || requiredValidator;
        }
        else if (required) {
            return requiredValidator;
        }
        else if (validate) {
            return validate;
        }
        return undefined;
    };
    const generateFileItem = (file) => {
        const index = file.name.lastIndexOf('.');
        return index >= 0 ? {
            name: file.name.substring(0, index),
            extension: file.name.substring(index + 1),
            size: file.size,
            file: file,
        } : {
            name: file.name,
            extension: '*',
            size: file.size,
            file: file
        };
    };
    const onFileChange = (e, fieldProps) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = [...fieldProps.input.value];
            for (let i = 0; i < e.target.files.length; ++i) {
                const fileItem = generateFileItem(e.target.files[i]);
                if (maxSize > 0 && fileItem.size > maxSize) {
                    onExceededMaxSizeFileSelected && onExceededMaxSizeFileSelected(fileItem);
                }
                else {
                    newFiles.push(fileItem);
                }
            }
            e.target.value = '';
            fieldProps.input.onChange(newFiles);
        }
    };
    const onDeleteFileClick = (index, fieldProps) => {
        const newFiles = [...fieldProps.input.value];
        newFiles.splice(index, 1);
        fieldProps.input.onChange(newFiles);
    };
    return (React.createElement(Field, { name: name, validate: getDefaultValidator() }, fieldProps => (React.createElement(FormControl, Object.assign({ className: clsx(classes.root, className), required: required, error: fieldProps.meta.touched && (Boolean(fieldProps.meta.error) || Boolean(fieldProps.meta.submitError)) }, others),
        label && React.createElement(InputLabel, { className: classes.label }, label),
        React.createElement("div", { className: classes.form },
            fieldProps.input.value && fieldProps.input.value.map((f, i) => (React.createElement(FormFilePreview, { className: classes.card, key: i, file: f, onDelete: () => onDeleteFileClick(i, fieldProps) }))),
            React.createElement("div", { className: classes.card },
                React.createElement("input", { id: `${name}-form-file`, className: classes.input, type: 'file', accept: accept, multiple: multiple, onChange: (e) => onFileChange(e, fieldProps) }),
                React.createElement("label", { htmlFor: `${name}-form-file` },
                    React.createElement("span", { className: classes.button },
                        React.createElement(CloudUploadOutlined, null),
                        React.createElement("span", { className: classes.buttonLabel }, chooseFileLabel))))),
        fieldProps.meta.touched && (Boolean(fieldProps.meta.error) || Boolean(fieldProps.meta.submitError)) && (React.createElement(FormHelperText, { className: classes.error }, fieldProps.meta.error || fieldProps.meta.submitError))))));
};
//# sourceMappingURL=form-file.js.map