import { HttpMethods, RTKUrls } from 'src/common/constants';
import {
  Chat,
  ChatWithMainData,
  CreateChat,
  UploadFile,
} from 'src/common/types.ts';

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
    getChatById: build.query<Chat, string | undefined>({
      query: (id: string) => ({
        url: `${RTKUrls.CHAT}/${id}`,
        method: HttpMethods.GET,
      }),
      providesTags: ['Chat'],
    }),
    createChat: build.mutation<Chat, CreateChat>({
      query: (body) => ({
        url: RTKUrls.CHAT,
        method: HttpMethods.POST,
        body,
      }),
    }),
    createSupport: build.mutation<Chat, undefined>({
      query: () => ({
        url: RTKUrls.SUPPORT,
        method: HttpMethods.POST,
      }),
    }),
    uploadFile: build.mutation<void, UploadFile>({
      query: ({ id, file }) => ({
        url: `${RTKUrls.CHAT}/${id}/file`,
        method: HttpMethods.POST,
        body: file,
      }),
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatByIdQuery,
  useCreateChatMutation,
  useCreateSupportMutation,
  useUploadFileMutation,
} = chatApi;
