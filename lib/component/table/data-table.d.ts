import { ReactElement, ReactNode } from 'react';
import { CommonComponentProps } from '../common-component';
export interface DataTableColumnConfig<T extends {}> {
    title: string;
    field?: keyof T;
    description?: string;
    align?: 'left' | 'center' | 'right';
    formatter?: (data: T) => ReactNode;
    width?: number;
    flex?: string;
}
export interface DataTableRowConfig<T extends {}> {
    classProvider?: (data: T, index: number) => string;
}
export interface DataTableCommonProps<T extends {}> extends CommonComponentProps {
    columns: DataTableColumnConfig<T>[];
    selectable?: boolean;
    onSelected?: (data?: T) => void;
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
    data: DataListSource<T> | undefined;
    onLoad?: () => Promise<void>;
} | {
    pageable: true;
    data: DataPageSource<T> | undefined;
    onLoad: (pageIndex?: number, pageSize?: number) => Promise<void>;
    onPageChange: (pageIndex: number, pageSize: number) => Promise<void>;
}) & DataTableCommonProps<T>;
export declare function DataTable<T extends {}>(props: DataTableProps<T>): ReactElement<any, any> | null;
//# sourceMappingURL=data-table.d.ts.map