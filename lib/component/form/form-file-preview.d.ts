import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
import { FileItem } from './form-file';
export interface FormFilePreviewProps extends CommonComponentProps {
    file: FileItem;
    onDelete: () => void;
}
export declare const FormFilePreview: FC<FormFilePreviewProps>;
//# sourceMappingURL=form-file-preview.d.ts.map