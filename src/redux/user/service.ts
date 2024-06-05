import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HttpMethods, RTKUrls } from 'src/common/constants';
import { IRegisterUserRequest, IRegisterUserResponse } from './types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}` }),
  endpoints: (builder) => ({
    userSignUp: builder.mutation<IRegisterUserResponse, IRegisterUserRequest>({
      query: (newUser) => ({
        url: RTKUrls.REGISTER_USER,
        method: HttpMethods.POST,
        body: newUser,
      }),
    }),
  }),
});

export const { useUserSignUpMutation } = userApi;
