import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
export declare type DataTableCellAlignment = 'left' | 'center' | 'right';
export interface DataTableCellProps extends CommonComponentProps {
    width?: string;
    fullWidth?: boolean;
    title?: string;
    align?: DataTableCellAlignment;
}
export declare const DataTableCell: FC<DataTableCellProps>;
//# sourceMappingURL=data-table-cell.d.ts.map