import {FormControl, FormControlProps, FormHelperText, InputLabel} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {CloudUploadOutlined} from '@material-ui/icons';
import clsx from 'clsx';
import React, {FC} from 'react';
import {Field, FieldRenderProps} from 'react-final-form';
import {CommonComponentProps} from '../common-component';
import {FormFilePreview} from './form-file-preview';

const useStyles = makeStyles((theme: Theme) => createStyles({
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

export interface FormFileProps extends CommonComponentProps {
  name: string;
  label?: string;
  accept?: string;
  multiple?: boolean;
  chooseFileLabel?: string;
  validate?: (value: FileItem[]) => any | Promise<any>;
  maxSize?: number;
  onExceededMaxSizeFileSelected?: (file: FileItem) => void;
}

export interface FileItem {
  file: File;
  name: string;
  extension: string;
  size: number;
  uri?: string;
}

export const FormFile: FC<FormFileProps & FormControlProps> = props => {
  const {className, name, label, required, validate, maxSize = -1, onExceededMaxSizeFileSelected,
    accept = '*/*', multiple = false, chooseFileLabel = 'Choose files', ...others} = props;
  const classes = useStyles();

  const getDefaultValidator = () => {
    const requiredValidator = (value: FileItem[]) => value && value.length > 0 ? undefined : 'Required';
    if (validate && required) {
      return validate || requiredValidator;
    } else if (required) {
      return requiredValidator;
    } else if (validate) {
      return validate;
    }
    return undefined;
  };

  const generateFileItem = (file: File): FileItem => {
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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldProps: FieldRenderProps<FileItem[], HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: FileItem[] = [...fieldProps.input.value];
      for (let i = 0; i < e.target.files.length; ++i) {
        const fileItem = generateFileItem(e.target.files[i]);
        if (maxSize > 0 && fileItem.size > maxSize) {
          onExceededMaxSizeFileSelected && onExceededMaxSizeFileSelected(fileItem);
        } else {
          newFiles.push(fileItem);
        }
      }
      e.target.value = '';
      fieldProps.input.onChange(newFiles);
    }
  };

  const onDeleteFileClick = (index: number, fieldProps: FieldRenderProps<FileItem[], HTMLInputElement>) => {
    const newFiles = [...fieldProps.input.value];
    newFiles.splice(index, 1);
    fieldProps.input.onChange(newFiles);
  };

  return (
    <Field<FileItem[]> name={name} validate={getDefaultValidator()}>{fieldProps => (
      <FormControl className={clsx(classes.root, className)} required={required}
                   error={fieldProps.meta.touched && (Boolean(fieldProps.meta.error) || Boolean(fieldProps.meta.submitError))} {...others}>
        {label && <InputLabel className={classes.label}>{label}</InputLabel>}
        <div className={classes.form}>
          {fieldProps.input.value && fieldProps.input.value.map((f, i) => (
            <FormFilePreview className={classes.card} key={i} file={f} onDelete={() => onDeleteFileClick(i, fieldProps)}/>
          ))}
          <div className={classes.card}>
            <input id={`${name}-form-file`} className={classes.input} type='file' accept={accept} multiple={multiple}
                   onChange={(e) => onFileChange(e, fieldProps)}/>
            <label htmlFor={`${name}-form-file`}>
              <span className={classes.button}>
                <CloudUploadOutlined/>
                <span className={classes.buttonLabel}>{chooseFileLabel}</span>
              </span>
            </label>
          </div>
        </div>
        {fieldProps.meta.touched && (Boolean(fieldProps.meta.error) || Boolean(fieldProps.meta.submitError)) && (
          <FormHelperText className={classes.error}>{fieldProps.meta.error || fieldProps.meta.submitError}</FormHelperText>
        )}
      </FormControl>
    )}</Field>
  );
};