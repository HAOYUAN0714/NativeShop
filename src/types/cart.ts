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
    params: null,
}

interface GetCart {
    reqData: null,
    resData: {
        data: CartRes
    },
    params: null,
}

interface UpdateCart {
    reqData: {
        product_id: string,
        qty: number
    },
    resData: {
        product_id: string,
        qty: number
    },
    params: {
        id: string
    },
}

interface DeleteCartProduct {
    reqData: null,
    resData: {},
    params: {
        id: string
    },
}

interface DeleteCart {
    reqData: null,
    resData: {},
    params: null,
}

export type {
    AddCart,
    Cart,
    CartProduct,
    CartRes,
    GetCart,
    UpdateCart,
    DeleteCart,
    DeleteCartProduct
}