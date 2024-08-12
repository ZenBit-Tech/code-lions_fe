import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, IMessage, ChatWithMainData } from 'src/common/types';
import { chatApi } from 'src/redux/chat/chatService';
import { logout } from 'src/redux/user/userSlice';

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
    setStatus: (
      state,
      action: PayloadAction<{
        userId: string;
        status: string;
        lastActive?: string;
      }>
    ) => {
      const { userId, lastActive } = action.payload;

      const isOnline = !lastActive;

      state.chatsWithMainData = state.chatsWithMainData.map(
        (chatWithMainData) =>
          chatWithMainData.chatPartner.id === userId
            ? {
                ...chatWithMainData,
                chatPartner: {
                  ...chatWithMainData.chatPartner,
                  isOnline,
                  lastActiveAt:
                    lastActive || chatWithMainData.chatPartner.lastActiveAt,
                },
              }
            : chatWithMainData
      );
    },
    setMessage: (
      state,
      action: PayloadAction<{ message: IMessage; chatId?: string }>
    ) => {
      const { message, chatId } = action.payload;
      const updateChatMessages = (chat: Chat) => {
        return {
          ...chat,
          messages: [...chat.messages, message],
        };
      };

      const updateChatWithMainData = (chatWithMainData: ChatWithMainData) => {
        const increment = 1;

        return {
          ...chatWithMainData,
          lastMessage: message,
          unreadMessageCount: chatId
            ? chatWithMainData.unreadMessageCount
            : chatWithMainData.unreadMessageCount + increment,
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
      chatApi.endpoints.getChats.matchFulfilled,
      (state: ChatState, action: PayloadAction<ChatWithMainData[]>) => {
        state.chatsWithMainData = action.payload;
      }
    );
    builder.addMatcher(
      chatApi.endpoints.getChatById.matchFulfilled,
      (state: ChatState, action: PayloadAction<Chat>) => {
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
    builder.addMatcher(
      (action) => action.type === logout.type,
      () => initialState
    );
  },
});

export const { setMessage, markAsRead, setStatus } = chatSlice.actions;

export default chatSlice.reducer;
