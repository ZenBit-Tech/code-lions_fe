import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { DefaultEventsMap } from '@socket.io/component-emitter';
import { IMessage } from 'common/types.ts';
import { io, Socket } from 'socket.io-client';
import { useGetChatsQuery } from 'src/redux/chat/chatService';
import { setMessage, markAsRead, setStatus } from 'src/redux/chat/chatSlice';

interface UseChatSocketParams {
  myId: string;
  accessToken?: string;
}

const useChatSocket = ({ accessToken, myId }: UseChatSocketParams) => {
  const dispatch = useDispatch();
  const [chatId, setChatId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [typingStatus, setTypingStatus] = useState<boolean>(false);
  const socketRef = useRef<Socket<DefaultEventsMap>>();
  const { refetch } = useGetChatsQuery();

  const send = useCallback(
    (message: string) => {
      if (message.trim()) {
        socketRef.current?.emit('sendMessage', { chatId, content: message });
      }
    },
    [chatId]
  );

  const setTyping = useCallback(
    (message: string) => {
      setInputValue(message);
      socketRef.current?.emit('userTyping', {
        chatId,
        typing: !!message.trim(),
      });
    },
    [chatId]
  );

  const setMarkAsRead = useCallback(() => {
    socketRef.current?.emit('markMessageAsRead', { chatId });
    if (chatId) {
      dispatch(markAsRead(chatId));
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`, {
      auth: { token: accessToken },
    });

    socketRef.current = socket;

    socket.on('newMessage', (incomingMessage: IMessage) => {
      if (chatId) {
        if (incomingMessage.sender.id === myId) {
          dispatch(setMessage({ message: incomingMessage, chatId }));
          setInputValue('');
          setTyping('');
        } else {
          dispatch(setMessage({ message: incomingMessage }));
        }
      } else {
        refetch();
      }
    });

    socket.on('userTyping', (data: { chatId: string; typing: boolean }) => {
      if (data.chatId === chatId) {
        setTypingStatus(data.typing);
      }
    });

    socket.on('newChat', () => {
      refetch();
    });

    socket.on(
      'userStatus',
      (data: { userId: string; status: string; lastActive?: string }) => {
        if (data.userId !== myId) {
          dispatch(setStatus(data));
        }
      }
    );

    return () => {
      setTyping('');
      socket.off('newMessage');
      socket.off('userTyping');
      socket.off('newChat');
      socket.disconnect();
    };
  }, [chatId, accessToken, dispatch, myId, refetch]);

  useEffect(() => {
    setInputValue('');
    setTypingStatus(false);
  }, [chatId]);

  useEffect(() => {
    refetch();
  }, [myId]);

  return {
    inputValue,
    setTyping,
    typingStatus,
    send,
    setMarkAsRead,
    setChatId,
  };
};

export default useChatSocket;
