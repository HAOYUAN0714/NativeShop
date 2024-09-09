interface UserLogin {
    reqData: {
        username: string;
        password: string;
    };
    resData: {
        token: string;
    };
    params: null;
}

export {
    UserLogin
}