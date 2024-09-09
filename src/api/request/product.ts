import { apiGet } from '@/api/request/base';
import {
    type GetAllProduct,
    type GetProductDetail,
    type GetProductList,
    type RequestTypes
} from '@/types';

export const getAllProduct = async (options: RequestTypes<GetAllProduct['reqData'], GetAllProduct['resData']>) => {
    return apiGet<GetAllProduct>('products/all', options);
};

export const getProductList = async (options: RequestTypes<GetProductList['reqData'], GetProductList['resData']>) => {
    return apiGet<GetProductList>('products/all', options);
};

export const getProductDetail = async (options: RequestTypes<GetProductDetail['reqData'], GetProductDetail['resData']>) => {
    return apiGet<GetProductDetail>('products/all', options);
};
