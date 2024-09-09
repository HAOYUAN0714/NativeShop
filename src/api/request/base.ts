import { requestApi } from '@/api/common';
import { type RequestTypes } from '@/types';

export const apiGet = <T extends RequestTypes>(
    url: string,
    options: RequestTypes<T['reqData'], T['resData'], T['params']> = {}
) => requestApi<T>(url, 'GET', options);

export const apiPost = <T extends RequestTypes>(
    url: string,
    options: RequestTypes<T['reqData'], T['resData'], T['params']> = {}
) => requestApi<T>(url, 'POST', options);

export const apiPut = <T extends RequestTypes>(
    url: string,
    options: RequestTypes<T['reqData'], T['resData'], T['params']> = {}
) => requestApi<T>(url, 'PUT', options);

export const apiDelete = <T extends RequestTypes>(
    url: string,
    options: RequestTypes<T['reqData'], T['resData'], T['params']> = {}
) => requestApi<T>(url, 'DELETE', options);

export const apiPatch = <T extends RequestTypes>(
    url: string,
    options: RequestTypes<T['reqData'], T['resData'], T['params']> = {}
) => requestApi<T>(url, 'PATCH', options);