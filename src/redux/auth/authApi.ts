import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILoginDto, ILoginResponse } from 'src/redux/types/user';
import { HttpMethods, RTKUrls } from "src/common/constants";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginDto>({
      query: (credentials) => ({
        url: RTKUrls.SIGN_IN,
        method: HttpMethods.POST,
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
