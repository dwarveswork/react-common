import { ReactComponentElement, ReactElement, ReactNode } from 'react';
import { CommonComponentProps } from '../common-component';
export interface DataTableColumnConfig<T extends {}> {
    field?: keyof T;
    title?: string;
    description?: string;
    align?: 'left' | 'center' | 'right';
    component?: ReactComponentElement<any>;
    formatter?: (data: T, key?: keyof T) => ReactNode;
    width?: string;
}
export interface DataTableCommonProps<T extends {}> extends CommonComponentProps {
    columns: DataTableColumnConfig<T>[];
    loading?: boolean;
    errorLabel?: string;
    loadingLabel?: string;
    emptyLabel?: string;
    totalLabel?: string;
}
export declare type DataListSource<T> = T[];
export interface DataPageSource<T> {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    data: T[];
}
export interface DataSource<T> {
    data: T[];
    totalCount: number;
    pageable: boolean;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
}
export declare type DataTableProps<T extends {}> = ({
    pageable: false;
    data?: DataListSource<T>;
    onLoad?: () => Promise<void>;
    selectable?: boolean;
    onSelected?: (data?: T) => void;
} | {
    pageable: true;
    data?: DataPageSource<T>;
    onLoad: (pageIndex?: number, pageSize?: number) => Promise<void>;
    onPageChange: (pageIndex: number, pageSize: number) => Promise<void>;
}) & DataTableCommonProps<T>;
export declare function DataTable<T extends {}>(props: DataTableProps<T>): ReactElement<any, any> | null;
//# sourceMappingURL=data-table.d.ts.map