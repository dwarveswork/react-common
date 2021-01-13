export interface ApiResponse<T> {
    status: number;
    message: string;
    body: T;
}
export interface DataPage<T> {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    data: T[];
}
export declare type EmptyRequest = {};
export interface FindByIdRequest {
    id: number;
}
export declare type ExecuteRequest<Request, Response> = (data: Request) => Promise<Response | undefined>;
export declare type CancelRequest = (message?: string) => void;
export interface Api<Request, Response> {
    response: Response | undefined;
    submitting: boolean;
    execute: ExecuteRequest<Request, Response>;
    cancel: CancelRequest;
}
export declare const useApi: <Request_1, Response_1>(uri: string, data?: Request_1 | undefined) => Api<Request_1, Response_1>;
//# sourceMappingURL=api.d.ts.map