import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { DefaultEventsMap } from '@socket.io/component-emitter';
import { IMessage } from 'common/types.ts';
import { io, Socket } from 'socket.io-client';
import { setMessage } from 'src/redux/chat/chatSlice';

interface UseChatSocketParams {
  chatId?: string;
  accessToken?: string;
}

const useChatSocket = ({ chatId, accessToken }: UseChatSocketParams) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const socketRef = useRef<Socket<DefaultEventsMap>>();

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_API_URL}`, {
      auth: { token: accessToken },
    });

    socketRef.current = socket;

    socket.on('newMessage', (incomingMessage: IMessage) => {
      if (chatId) {
        dispatch(setMessage({ chatId, message: incomingMessage }));
        setInputValue('');
      }
    });

    return () => {
      socket.off('newMessage');
      socket.disconnect();
    };
  }, [chatId, accessToken, dispatch]);

  const send = (message: string) => {
    if (message.trim()) {
      socketRef.current?.emit('sendMessage', { chatId, content: message });
    }
  };

  return {
    inputValue,
    setInputValue,
    send,
  };
};

export default useChatSocket;
