import axios from 'axios';
import {useEffect, useRef, useState} from 'react';
import {useHttpClient} from './http-client';

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

export type EmptyRequest = {};

export interface FindByIdRequest {
  id: number;
}

export type ExecuteRequest<Request, Response> = (data: Request) => Promise<Response | undefined>;

export type CancelRequest = (message?: string) => void;

export interface Api<Request, Response> {
  response: Response | undefined;
  submitting: boolean;
  execute: ExecuteRequest<Request, Response>;
  cancel: CancelRequest;
}

export const useApi = <Request, Response>(uri: string, data?: Request): Api<Request, Response> => {
  const client = useHttpClient();

  const submitting = useRef<boolean>(false);
  const [response, setResponse] = useState<Response>();
  const cancelToken = axios.CancelToken.source();

  const execute: ExecuteRequest<Request, Response> = (data: Request) => {
    submitting.current = true;
    return client.request<ApiResponse<Response>>({
      url: uri,
      method: 'post',
      data: data,
      cancelToken: cancelToken.token
    }).then(data => {
      setResponse(data.data.body);
      return data.data.body;
    }).catch(reason => {
      if (!axios.isCancel(reason)) {
        throw reason;
      }
      return undefined;
    }).finally(() => {
      submitting.current = false;
    });
  };

  const cancel: CancelRequest = (message: string = 'cancelled') => {
    cancelToken.cancel(message);
  };

  useEffect(() => {
    if (data) {
      execute(data);
    }
    return () => {
      submitting.current && cancel('unmounted');
    };
  }, []);

  return {response, submitting: submitting.current, execute, cancel};
};