import axios from 'axios';
import React, { createContext, useContext } from 'react';
import { useApp } from '../app';
export const HttpClientContext = createContext({});
export const HttpClientProvider = props => {
    const { authenticationUri } = props;
    const app = useApp();
    const context = axios.create();
    context.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }
        else if (error.response) {
            if ((error.response.status === 401 || error.response.status === 403) && authenticationUri) {
                document.location.href = authenticationUri;
            }
            else {
                app.showError(error.response.status + ' - ' + error.message);
            }
            return Promise.reject(error);
        }
        else {
            app.showError(error.message);
            return Promise.reject(error);
        }
    });
    return (React.createElement(HttpClientContext.Provider, { value: context }, props.children));
};
export const useHttpClient = () => useContext(HttpClientContext);
//# sourceMappingURL=http-client.js.map