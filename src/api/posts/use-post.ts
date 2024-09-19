import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Post } from './types';

type Variables = { id: string };
type Response = Post;

export const usePost = createQuery<Response, Variables, AxiosError>({
  queryKey: ['posts'],
  fetcher: (variables) => {
    return client
        .request({
            baseURL: 'https://dummyjson.com/',
            url: `posts/${variables.id}`,
            method: 'GET',
        })
        .then((response) => response.data);
  },
});
