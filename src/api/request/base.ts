import { Env } from '@env';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { emitter } from '@/core/mitt';
import type * as Types from '@/types';

const defaultConfig: AxiosRequestConfig = {
    baseURL: `${Env.API_URL}/v2/api/${Env.API_PATH}`,
    timeout: 0.5 * 60 * 1000,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
};

const userConfig: AxiosRequestConfig = {
    baseURL: `${Env.API_URL}/v2/`,
    timeout: 0.5 * 60 * 1000,
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
}


export default class RequestBase {
    constructor() {
        this.setRequestInterceptors();
        this.setResponseInterceptors();
    }

    // 基礎請求實例
    private static axiosInstance: AxiosInstance = axios.create(defaultConfig);

    // user 登入登出請求實例
    private static userAxiosInstance: AxiosInstance = axios.create(userConfig);

    // 建立請求攔截器
    private setRequestInterceptors = ():void => {
        RequestBase.axiosInstance.interceptors.request.use(
            (config) => {
                console.log('requestInterceptors', config);
                return config;
            },
            (error) => {
                console.error('requestInterceptors error', error);
                return Promise.reject(error);
            }
        );
    };

    // 建立接收攔截器
    private setResponseInterceptors = ():void => {
        RequestBase.axiosInstance.interceptors.response.use(function (response) {
            console.log('responseInterceptors', response);
            return response;
        }, function (error) {
            console.error('responseInterceptors error', error);
            return Promise.reject(error);
        });
    };

    // 拋出的錯誤信息
    private errorHandler(error: (Error) & { response: any } & { code: string; message: string }) {
        const errorCode = error?.response?.data?.code ?? error.code
        const errorMessage = error?.response?.data?.message ?? error.message

        emitter.emit('requestError', {
            response: error,
            code: errorCode,
            message: errorMessage
        })
        
        return error
    }

    // 設定請求參數
    private getRequestSetting = 
        (url: string, method: string, options?: AxiosRequestConfig
    ): AxiosRequestConfig => {
        console.log('createInstance', {url, method, options});
         const { data, params } = options || {};

        const headers: Record<string, string> = {
            Authorization:
                document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('hexToken='))
                    ?.split('=')[1] || '',
        };

        const baseURL = url.includes('signin') || url.includes('logout')
            ? `${Env.API_URL}/v2/`
            : defaultConfig.baseURL;

        return {
            ...defaultConfig,
            baseURL,
            headers: {
                ...defaultConfig.headers,
                ...headers,
            },
            url,
            method,
            ...(data && { data }),
            ...(params && { params }),
        };
    };

    // 請求API回傳資料
    protected requestApi = async<T extends Types.RequestTypes<T['reqData'], T['resData']>> (url: string, method: string, options?: AxiosRequestConfig
    ): Promise<T['resData'] & Types.BasicResponse> => {
        console.log('requestApi', {url, method, options});
        const requestConfig = this.getRequestSetting(url, method, options);

        const res = await RequestBase.axiosInstance.request(requestConfig)
            .then(response => {
                console.log('requestApi response', response);
                if (response.status !== 200) {
                    throw new Error(`${method} ${url} : response error`);
                }

                return response;
            })
            .catch(this.errorHandler);
        
        return res;
    };

    protected apiGet = <T extends Types.RequestTypes<T['reqData'], T['resData']>>(
        url: string,
     ) => (reqData: T['reqData'] & Types.BasicRequest) => {
     
        const { path = '', ...params } = reqData;

        const requestConfig = {
            ...(params && { params }),
            url: path
                ? `${url}/${path}`
                : url
        }

        return this.requestApi<T>(url, 'GET', requestConfig);
    }

    protected apiPost = <T extends Types.RequestTypes<T['reqData'], T['resData']>>(
        url: string,
    ) => (reqData: T['reqData'] & Types.BasicRequest) => {

        const { path = '', ...data } = reqData;

        const requestConfig = {
            ...(data && { data }),
            url: path
                ? `${url}/${path}`
                : url
        }

        return this.requestApi<T>(url, 'POST', requestConfig);
    }

    protected apiPut = <T extends Types.RequestTypes<T['reqData'], T['resData']>>(
        url: string,
    ) => (reqData: T['reqData'] & Types.BasicRequest) => {
    
        const { path = '', ...data } = reqData;

        const requestConfig = {
            ...(data && { data }),
            url: path
                ? `${url}/${path}`
                : url
        }

        return this.requestApi<T>(url, 'PUT', requestConfig);
    }

    protected apiDelete = <T extends Types.RequestTypes<T['reqData'], T['resData']>>(
        url: string,
    ) => (reqData: T['reqData'] & Types.BasicRequest) => {
    
        const { path = '', ...data } = reqData;

        const requestConfig = {
            ...(data && { data }),
            url: path
                ? `${url}/${path}`
                : url
        }

        return this.requestApi<T>(url, 'DELETE', requestConfig);
    }

};
