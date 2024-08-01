import { useEffect, useRef } from 'react';

import { Chat } from 'common/types.ts';
import useChatSocket from 'src/common/hooks/useChatSocket';
import { useAppSelector } from 'src/redux/hooks';

import ChatAvatar from './ChatAvatar';
import MessageBody from './MessageBody.tsx';
import MessageInput from './MessageInput';
import SenderTyping from './SenderTyping';
import {
  ChatMessagesContainer,
  ScrollableMessageBox,
  ChatWithTextBox,
} from './styles.ts';

type Props = {
  chat?: Chat;
  socket: ReturnType<typeof useChatSocket>;
};

function ChatMessages({ chat, socket }: Props) {
  const { id: myId } = useAppSelector((state) => state.user);
  const chatWithMainData = useAppSelector((state) =>
    state.chat.chatsWithMainData.find(
      (chatElement) => chatElement?.id === chat?.id
    )
  );
  const { inputValue, send, setMarkAsRead, setTyping, typingStatus } = socket;

  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollTo({
        top: bottomOfMessagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
      if (chat?.messages?.length) {
        setMarkAsRead();
      }
    }
  }, [chat?.messages, typingStatus]);

  return (
    <ChatMessagesContainer>
      <ChatAvatar chat={chat} chatPartner={chatWithMainData!.chatPartner} />
      <ChatWithTextBox>
        <ScrollableMessageBox ref={bottomOfMessagesRef}>
          {chat?.messages?.map((messageElement) => (
            <MessageBody
              key={messageElement.id}
              message={messageElement}
              myId={myId}
            />
          ))}
          {typingStatus && (
            <SenderTyping chatPartner={chatWithMainData!.chatPartner} />
          )}
        </ScrollableMessageBox>
        <MessageInput
          chatId={chat!.id}
          inputValue={inputValue}
          setTyping={setTyping}
          send={send}
        />
      </ChatWithTextBox>
    </ChatMessagesContainer>
  );
}

export default ChatMessages;
