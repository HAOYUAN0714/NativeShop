
type OrderProduct = {
    id: string,
    product_id: string,
    qty: number,
}

type OrderType = {
    create_at: EpochTimeStamp | DOMHighResTimeStamp, // 訂單建立時間
    id: string, // 訂單 ID
    is_paid: boolean, // 是否已付款
    message?: string, // 訂單留言
    total: number, // 訂單總金額
    num: string
    products: {
        [id: string]: OrderProduct
    },
    user: {
        address: string, // 地址
        email: string, // 電子郵件
        name: string, // 姓名
        tel: string // 電話
    },
}

type OrderListData = OrderProduct & OrderType;

interface AddOrder {
    reqData: {
        data: {
            user: {
                name: string,
                email: string,
                tel: string,
                address: string
            },
            message?: string
        }
    },
    resData: {
        total: number,
        create_at: EpochTimeStamp | DOMHighResTimeStamp,
        orderId: string
    },
    params: null,
}

interface GetOrderList {
    reqData: {
        page: string
    },
    resData: {
        orders: OrderType[],
        pagination: {
            total_pages: number,
            current_page: number,
            has_pre: boolean,
            has_next: boolean,
            category: string
        },
    },
    params: null,
}

interface GetOrderDetail {
    reqData: null,
    resData: {
        orders: OrderType,
    },
    params: {
        order_id: string
    },
}

export {
    OrderProduct,
    OrderType,
    OrderListData,
    AddOrder,
    GetOrderList,
    GetOrderDetail,
}