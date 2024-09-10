import { type OrderType } from "./orders"

interface PayOrder {
    reqData: null,
    resData: {
        orders: OrderType
    },
    params: {
        order_id: string
    }
}

export {
    PayOrder
}