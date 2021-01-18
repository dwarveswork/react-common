import { FormControlProps } from '@material-ui/core';
import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
export interface SelectOption {
    title: string;
    value: any;
}
export interface FormSelectProps extends CommonComponentProps {
    name: string;
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    validate?: (value: string) => any | Promise<any>;
}
export declare const FormSelect: FC<FormSelectProps & FormControlProps>;
//# sourceMappingURL=form-select.d.ts.map