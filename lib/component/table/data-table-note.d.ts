import { FC } from 'react';
import { CommonComponentProps } from '../common-component';
export interface DataTableNoteProps extends CommonComponentProps {
    pageable: boolean;
    totalCount: number;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalLabel?: string;
}
export declare const DataTableNote: FC<DataTableNoteProps>;
//# sourceMappingURL=data-table-note.d.ts.map