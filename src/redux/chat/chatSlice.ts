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
      action: PayloadAction<{ chatId: string; message: IMessage }>
    ) => {
      const { chatId, message } = action.payload;

      state.chats = state.chats.map((chat) => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, message],
          };
        }

        return chat;
      });

      state.chatsWithMainData = state.chatsWithMainData.map(
        (chatWithMainData) => {
          if (chatWithMainData.id === chatId) {
            return {
              ...chatWithMainData,
              lastMessage: message,
            };
          }

          return chatWithMainData;
        }
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
        const notFoundIndex = -1;
        const chat = action.payload;
        const chatIndex = state.chats.findIndex(
          (existChat) => existChat.id === chat.id
        );

        if (chatIndex === notFoundIndex) {
          state.chats.push(chat);
        } else {
          state.chats = state.chats.map((existChat) =>
            existChat.id === chat.id ? chat : existChat
          );
        }
      }
    );
  },
});

export const { setMessage } = chatSlice.actions;

export default chatSlice.reducer;
