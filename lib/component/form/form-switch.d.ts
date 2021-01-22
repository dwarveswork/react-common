import { FormControlLabelProps } from '@material-ui/core/FormControlLabel/FormControlLabel';
import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
export interface FormSwitchProps extends CommonComponentProps {
    name: string;
    label: string;
    validate?: (value: boolean) => any | Promise<any>;
}
export declare const FormSwitch: FC<FormSwitchProps & Partial<FormControlLabelProps>>;
//# sourceMappingURL=form-switch.d.ts.map