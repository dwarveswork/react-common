import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useHttpClient } from './http-client';
export const useApi = (uri, data) => {
    const client = useHttpClient();
    const submitting = useRef(false);
    const [response, setResponse] = useState();
    const cancelToken = axios.CancelToken.source();
    const execute = (data) => {
        submitting.current = true;
        return client.request({
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
    const cancel = (message = 'cancelled') => {
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
    return { response, submitting: submitting.current, execute, cancel };
};
//# sourceMappingURL=api.js.map