import { createContext } from 'react';

import useChatSocket from 'src/common/hooks/useChatSocket';

const defaultChatSocketContext: ReturnType<typeof useChatSocket> = {
  setTyping: () => {},
  setChatId: () => {},
  inputValue: '',
  setMarkAsRead: () => {},
  typingStatus: false,
  send: () => {},
};

const ChatContext = createContext<ReturnType<typeof useChatSocket>>(
  defaultChatSocketContext
);

export default ChatContext;
