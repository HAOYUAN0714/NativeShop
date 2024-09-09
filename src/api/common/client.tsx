import { Env } from '@env';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { type BasicResponse,type RequestTypes } from '@/types';

const defaultConfig: AxiosRequestConfig = {
    baseURL: `${Env.API_URL}/v2/api/${Env.API_PATH}`,
    timeout: 0.5 * 60 * 1000,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};

// 建立請求實例
const createInstance = <ReqData, ResData, Params>
    (url: string, method: string, options: RequestTypes<ReqData, ResData, Params>
): AxiosInstance => {
    console.log('createInstance', {url, method, options});
    const { params = null, reqData = null, isFormData = false } = options || {};

    const headers: Record<string, string> = {
        Authorization:
            document.cookie
                .split('; ')
                .find((row) => row.startsWith('hexToken='))
                ?.split('=')[1] || '',
        ...(!isFormData && { 'Content-Type': 'application/json' }),
    };

    const baseURL = url.includes('signin') || url.includes('logout')
        ? `${Env.API_URL}/v2/`
        : defaultConfig.baseURL;

    return axios.create({
        ...defaultConfig,
        baseURL,
        headers: {
            ...defaultConfig.headers,
            ...headers,
        },
        url,
        method,
        ...(reqData && { data: reqData }),
        ...(params && { params }),
    });
};

export const requestApi = async <T extends RequestTypes>
    (url: string, method: string, options: RequestTypes<T['reqData'], T['resData'], T['params']>
): Promise<T['resData'] & BasicResponse> => {
    console.log('requestApi', {url, method, options});
    const instance = createInstance(url, method, options);
    const { reqData = null, params = null } = options;

    try {
        const response = await instance.request<T['resData']>({
            url,
            method,
            ...(reqData && { data: reqData }),
            ...(params && { params: params }),
        });
        console.log('requestApi response', response);
        if (response.status !== 200) {
            throw new Error(`${method} ${url} : response error`);
        }

        return response.data;
    } catch (error) {
        console.error('requestApi error', error);
        throw new Error(`${method} ${url} , error: ${error}`);
    }
};

export const client = axios.create({
    baseURL: Env.API_URL,
});
