import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { httpStatusCodes, HttpMethods, RTKUrls } from 'src/common/constants.ts';
import { RootState } from 'src/common/types';

import { IRefreshTokenResponse } from './user/types';
import { logout, setTokens } from './user/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}`,
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.accessToken;

    if (token) headers.set('authorization', `Bearer ${token}`);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;
  const { refreshToken } = state.user;

  try {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      if (
        result.error.status === httpStatusCodes.UNAUTHORIZED &&
        refreshToken
      ) {
        const refreshResult = await baseQuery(
          {
            body: { refreshToken },
            method: HttpMethods.POST,
            url: RTKUrls.REFRESH_TOKEN,
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const data = refreshResult.data as IRefreshTokenResponse;

          api.dispatch(setTokens(data));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      }
    }

    return result;
  } catch (error) {
    return { error: error as FetchBaseQueryError };
  }
};

export default baseQueryWithReauth;
