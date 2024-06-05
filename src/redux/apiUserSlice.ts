import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUserSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}` }),
  endpoints: (builder) => ({
    userSignUp: builder.mutation({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const { useUserSignUpMutation } = apiUserSlice;
