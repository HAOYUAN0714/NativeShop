type BasicResponse = {
    success?: boolean;
    message?: string,
};

type RequestTypes<ReqData = any, ResData = any, Params = any> = {
    reqData?: ReqData;
    resData?: ResData;
    params?: Params;
    isFormData?: boolean;
}


export {
    BasicResponse,
    RequestTypes
}