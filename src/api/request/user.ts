import { apiPost } from '@/api/request/base';
import { type RequestTypes,type UserLogin } from '@/types';

export const login = async (options: RequestTypes<UserLogin['reqData'], UserLogin['resData']>) => {
    return apiPost<UserLogin>('admin/signin', options);
};

export const logout = async () => {
    return apiPost('logout');
};

export const checkIsLogin = async () => {
    return apiPost('user/check');
};