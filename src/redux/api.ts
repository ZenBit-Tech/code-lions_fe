import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReauth } from './user/userService';

const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: ['User', 'Chat'],
});

export default api;
