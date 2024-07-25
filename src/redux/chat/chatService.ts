import { HttpMethods, RTKUrls } from 'src/common/constants';
import { Chat, ChatWithMainData } from 'src/common/types.ts';

import api from '../api';

export const chatApi = api.injectEndpoints({
  endpoints: (build) => ({
    getChats: build.query<ChatWithMainData[], void>({
      query: () => ({
        url: RTKUrls.CHAT,
        method: HttpMethods.GET,
      }),
      providesTags: ['Chat'],
    }),
    getChatById: build.query<Chat, string>({
      query: (id: string) => ({
        url: `${RTKUrls.CHAT}/${id}`,
        method: HttpMethods.GET,
      }),
      providesTags: ['Chat'],
    }),
  }),
});

export const { useGetChatsQuery, useGetChatByIdQuery } = chatApi;
