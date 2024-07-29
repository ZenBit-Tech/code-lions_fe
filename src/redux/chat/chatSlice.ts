import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, IMessage, ChatWithMainData } from 'src/common/types';
import api from 'src/redux/api';

type ChatState = {
  chatsWithMainData: ChatWithMainData[];
  chats: Chat[];
};

const initialState: ChatState = {
  chatsWithMainData: [],
  chats: [],
};

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setMessage: (
      state,
      action: PayloadAction<{ message: IMessage; chatId?: string }>
    ) => {
      const { message, chatId } = action.payload;
      const updateChatMessages = (chat) => {
        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      };

      const updateChatWithMainData = (chatWithMainData) => {
        const increment = 1;

        return {
          ...chatWithMainData,
          lastMessage: message,
          unreadMessageCount: chatWithMainData.unreadMessageCount + increment,
        };
      };

      if (chatId) {
        state.chats = state.chats.map((chat) =>
          chat.id === chatId ? updateChatMessages(chat) : chat
        );
        state.chatsWithMainData = state.chatsWithMainData.map(
          (chatWithMainData) =>
            chatWithMainData.id === chatId
              ? updateChatWithMainData(chatWithMainData)
              : chatWithMainData
        );
      } else {
        state.chats = state.chats.map((chat) =>
          chat.chatPartner.id === message.sender.id
            ? updateChatMessages(chat)
            : chat
        );
        state.chatsWithMainData = state.chatsWithMainData.map(
          (chatWithMainData) =>
            chatWithMainData.chatPartner.id === message.sender.id
              ? updateChatWithMainData(chatWithMainData)
              : chatWithMainData
        );
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      const messageCountZero = 0;

      state.chatsWithMainData = state.chatsWithMainData.map(
        (chatWithMainData) =>
          chatWithMainData.id === chatId
            ? { ...chatWithMainData, unreadMessageCount: messageCountZero }
            : chatWithMainData
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getChats.matchFulfilled,
      (state, action) => {
        state.chatsWithMainData = action.payload;
      }
    );
    builder.addMatcher(
      api.endpoints.getChatById.matchFulfilled,
      (state, action) => {
        const chat = action.payload;
        const notFoundIndex = -1;

        const chatIndex = state.chats.findIndex(
          (existChat) => existChat.id === chat.id
        );

        if (chatIndex === notFoundIndex) {
          state.chats.push(chat);
        } else {
          state.chats[chatIndex] = chat;
        }
      }
    );
  },
});

export const { setMessage, markAsRead } = chatSlice.actions;

export default chatSlice.reducer;
