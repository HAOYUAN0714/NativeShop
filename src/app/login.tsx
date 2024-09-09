import { useRouter } from 'expo-router';
import React from 'react';

import { login as loginRequest } from '@/api/request/user';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
    const router = useRouter();
    const signIn = useAuth.use.signIn();


    const onSubmit: LoginFormProps['onSubmit'] = async(data) => {
        const { email , password } = data;

        const res = await loginRequest({
            reqData: {
                username: email,
                password,
            }
        });

        const { token } = res || {};

        if (!token || !res?.success) {

            return;
        }


        console.log('login', data);
        signIn({ access: token, refresh: 'refresh-token' });
        router.push('/');
    };
    return (
        <>
        <FocusAwareStatusBar />
        <LoginForm onSubmit={onSubmit} />
        </>
    );
}
