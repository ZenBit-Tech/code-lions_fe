import { createApi } from '@reduxjs/toolkit/query/react';
import { RTKUrls, HttpMethods } from 'src/common/constants';
import { baseQueryWithReauth } from 'src/redux/user/userService.ts';

import { INotification, ICreateNotification } from './types';

export const notificationsApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: 'notificationsApi',
  tagTypes: ['Notifications'],
  endpoints: (build) => ({
    getNotificationsByUser: build.query<INotification[], string>({
      query: (userId) => ({
        url: `${RTKUrls.NOTIFICATIONS}?userId=${userId}`,
        method: HttpMethods.GET,
      }),
      providesTags: ['Notifications'],
    }),
    createNotification: build.mutation<INotification, ICreateNotification>({
      query: (notificationData) => ({
        url: RTKUrls.NOTIFICATIONS,
        method: HttpMethods.POST,
        body: notificationData,
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const { useGetNotificationsByUserQuery, useCreateNotificationMutation } =
  notificationsApi;
