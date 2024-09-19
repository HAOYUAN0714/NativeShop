type CartProduct = {
    category: string,
    content: string,
    description: string,
    id: string,
    imageUrl: string,
    imagesUrl: string[],
    is_enabled: number,
    num: number,
    origin_price: number,
    price: number,
    title:string,
    unit: string,
}

type Cart = {
    id: string,
    product: CartProduct,
    product_id: string,
    qty: number,
    total: number,
    final_total: number,
}

type CartRes = {
    carts: Cart[],
    total: number,
    final_total: number,
}

interface AddCart {
    reqData: {
        product_id: string,
        qty: number
    },
    resData: {
        data: Cart
    },
}

interface GetCart {
    reqData: {},
    resData: {
        data: CartRes
    },
}

interface UpdateCartProduct {
    reqData: {
        product_id: string,
        qty: number,
        path: string
    },
    resData: {
        product_id: string,
        qty: number
    },
}

interface DeleteCartProduct {
    reqData: {
        path: string
    },
    resData: {},
}

interface DeleteCart {
    reqData: {},
    resData: {},
}

export type {
    AddCart,
    Cart,
    CartProduct,
    CartRes,
    GetCart,
    UpdateCartProduct,
    DeleteCart,
    DeleteCartProduct
}