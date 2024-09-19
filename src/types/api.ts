import type { AxiosRequestConfig } from 'axios';

type BasicResponse = {
    success?: boolean;
    message?: string,
};

type BasicRequest = {
    path?: string;
}

type RequestTypes<ReqData = undefined, ResData = undefined> = {
    reqData?: ReqData & BasicRequest;
    resData?: ResData & BasicResponse;
}


type RequestOptions<_T extends AxiosRequestConfig> = {

}

export {
    BasicResponse,
    BasicRequest,
    RequestTypes,
    RequestOptions
}