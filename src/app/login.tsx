import { useRouter } from 'expo-router';
import React from 'react';

import API from '@/api/request'
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { useAuth } from '@/core';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
    const router = useRouter();
    const signIn = useAuth.use.signIn();

    const onSubmit: LoginFormProps['onSubmit'] = async(data) => {
        const { email , password } = data;

        const res = await API.login({
            username: email,
            password,
        });

        const { token, success = false } = res || {};

        if (!token || !success) {
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
