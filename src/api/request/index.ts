import type * as Types from '@/types';
import RequestBase from './base';

class API extends RequestBase {
    // user
    login = this.apiPost<Types.UserLogin>('admin/signin');
    logout = () => this.apiPost('logout');
    checkLogin = () => this.apiGet('user/check');

    // product
    getAllProduct = this.apiGet<Types.GetAllProduct>('products/all');
    getProductList = this.apiGet<Types.GetProductList>('products');
    getProductDetail = this.apiGet<Types.GetProductDetail>('product');

    //cart
    addCart = this.apiPost<Types.AddCart>('cart');
    getCart = this.apiGet<Types.GetCart>('cart');
    updateCartProduct = this.apiPut<Types.UpdateCartProduct>('cart');
    deleteCartProduct = this.apiDelete<Types.DeleteCartProduct>('cart');
    deleteCarts = this.apiDelete<Types.DeleteCart>('carts');

    // orders
    postOrder = this.apiPost<Types.PostOrder>('order');
    getOrderList = this.apiGet<Types.GetOrderList>('orders');
    getOrderDetail = this.apiGet<Types.GetOrderDetail>('order');

    // pay
    payOrder = this.apiPost<Types.GetOrderDetail>('pay');
}

export default new API();