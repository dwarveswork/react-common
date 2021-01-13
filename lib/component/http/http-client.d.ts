import { AxiosInstance } from 'axios';
import React, { FC } from 'react';
export interface HttpClient extends AxiosInstance {
}
export declare const HttpClientContext: React.Context<HttpClient>;
export interface HttpClientProviderProps {
    authenticationUri?: string;
}
export declare const HttpClientProvider: FC<HttpClientProviderProps>;
export declare const useHttpClient: () => HttpClient;
//# sourceMappingURL=http-client.d.ts.map