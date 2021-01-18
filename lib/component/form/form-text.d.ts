import { TextFieldProps } from '@material-ui/core';
import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
export interface FormTextProps extends CommonComponentProps {
    name: string;
    validate?: (value: string) => any | Promise<any>;
}
export declare const FormText: FC<FormTextProps & TextFieldProps>;
//# sourceMappingURL=form-text.d.ts.map