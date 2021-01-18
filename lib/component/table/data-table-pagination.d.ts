import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
export interface DataTablePaginationProps extends CommonComponentProps {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    onPageChange: (pageIndex: number, pageSize: number) => void | Promise<void>;
    totalLabel?: string;
}
export declare const DataTablePagination: FC<DataTablePaginationProps>;
//# sourceMappingURL=data-table-pagination.d.ts.map