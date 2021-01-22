import axios, {AxiosError, AxiosInstance} from 'axios';
import React, {createContext, FC, useContext} from 'react';
import {useApp} from '../app';

export interface HttpClient extends AxiosInstance {

}

export const HttpClientContext = createContext<HttpClient>({} as never);

export interface HttpClientProviderProps {
  authenticationUri?: string;
}

export const HttpClientProvider: FC<HttpClientProviderProps> = props => {

  const {authenticationUri} = props;
  const app = useApp();
  const context = axios.create();
  context.interceptors.response.use(function (response) {
    return response;
  }, function (error: AxiosError) {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (error.response) {
      if ((error.response.status === 401 || error.response.status === 403) && authenticationUri) {
        document.location.href = authenticationUri;
      } else {
        app.showError(error.response.status + ' - ' + error.message);
      }
      return Promise.reject(error);
    } else {
      app.showError(error.message);
      return Promise.reject(error);
    }
  });

  return (
    <HttpClientContext.Provider value={context}>{props.children}</HttpClientContext.Provider>
  );
};

export const useHttpClient = () => useContext<HttpClient>(HttpClientContext);