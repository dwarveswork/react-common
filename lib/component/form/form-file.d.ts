import { FormControlProps } from '@material-ui/core';
import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
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
export declare const FormFile: FC<FormFileProps & FormControlProps>;
//# sourceMappingURL=form-file.d.ts.map