import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DefaultEventsMap } from '@socket.io/component-emitter';
import { IMessage } from 'common/types.ts';
import { io, Socket } from 'socket.io-client';
import { useGetChatsQuery } from 'src/redux/chat/chatService';
import { setMessage, markAsRead } from 'src/redux/chat/chatSlice';

interface UseChatSocketParams {
  myId: string;
  accessToken?: string;
  chatId?: string;
}

const useChatSocket = ({ chatId, accessToken, myId }: UseChatSocketParams) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const socketRef = useRef<Socket<DefaultEventsMap>>();
  const { refetch } = useGetChatsQuery();

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`, {
      auth: { token: accessToken },
    });

    socketRef.current = socket;

    socket.on('newMessage', (incomingMessage: IMessage) => {
      if (chatId) {
        if (incomingMessage.sender.id === myId) {
          dispatch(setMessage({ message: incomingMessage, chatId }));
        } else {
          dispatch(setMessage({ message: incomingMessage }));
        }
        setInputValue('');
      } else {
        refetch();
      }
    });

    socket.on('newChat', () => {
      refetch();
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChat');
      socket.disconnect();
    };
  }, [chatId, accessToken, dispatch, myId, refetch]);

  const send = (message: string) => {
    if (message.trim()) {
      socketRef.current?.emit('sendMessage', { chatId, content: message });
    }
  };

  const setMarkAsRead = () => {
    socketRef.current?.emit('markMessageAsRead', { chatId });
    if (chatId) {
      dispatch(markAsRead(chatId));
    }
  };

  return {
    inputValue,
    setInputValue,
    send,
    setMarkAsRead,
  };
};

export default useChatSocket;
