import { SnackbarCloseReason } from '@material-ui/core/Snackbar/Snackbar';
import React, { FC } from 'react';
export declare enum PromptSeverity {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error"
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
export declare const Prompt: FC<PromptProps>;
//# sourceMappingURL=prompt.d.ts.map