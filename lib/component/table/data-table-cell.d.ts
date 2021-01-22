import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
export declare type DataTableCellAlignment = 'left' | 'center' | 'right';
export declare const DEFAULT_CELL_WIDTH = 100;
export interface DataTableCellProps extends CommonComponentProps {
    width?: number;
    flex?: string;
    title?: string;
    align?: DataTableCellAlignment;
}
export declare const DataTableCell: FC<DataTableCellProps>;
//# sourceMappingURL=data-table-cell.d.ts.map