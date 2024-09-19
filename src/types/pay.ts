import { type OrderType } from "./orders"

interface PayOrder {
    reqData: {
        path: string
    },
    resData: {
        orders: OrderType
    },
}

export {
    PayOrder
}