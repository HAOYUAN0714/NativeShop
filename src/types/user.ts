interface UserLogin {
    reqData: {
        username: string;
        password: string;
    };
    resData: {
        token: string;
    };
}

export {
    UserLogin
}