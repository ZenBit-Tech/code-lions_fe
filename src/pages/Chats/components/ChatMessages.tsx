import { useEffect, useRef } from 'react';

import { TextField, InputAdornment, IconButton } from '@mui/material';

import { Chat } from 'common/types.ts';
import SendMessageIcon from 'src/assets/icons/SendMessage.svg';
import useChatSocket from 'src/common/hooks/useChatSocket';
import { useAppSelector } from 'src/redux/hooks';

import MessageBody from './MessageBody.tsx';
import {
  AvatarContainer,
  ChatMessagesContainer,
  StyledAvatar,
  StyledTypography,
  ScrollableMessageBox,
  ChatWithTextBox,
} from './styles.ts';

type Props = {
  chat?: Chat;
  socket: ReturnType<typeof useChatSocket>;
};

function ChatMessages({ chat, socket }: Props) {
  const { id: myId } = useAppSelector((state) => state.user);
  const { inputValue, setInputValue, send, setMarkAsRead } = socket;

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
  }, [chat?.messages]);

  return (
    <ChatMessagesContainer>
      <AvatarContainer>
        <StyledAvatar src={chat?.chatPartner?.photoUrl} />
        <StyledTypography>{chat?.chatPartner?.name}</StyledTypography>
      </AvatarContainer>
      <ChatWithTextBox>
        <ScrollableMessageBox ref={bottomOfMessagesRef}>
          {chat?.messages?.map((messageElement) => (
            <MessageBody
              key={messageElement.id}
              message={messageElement}
              myId={myId}
            />
          ))}
        </ScrollableMessageBox>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              send(inputValue);
            }
          }}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => send(inputValue)} edge="end">
                  <SendMessageIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </ChatWithTextBox>
    </ChatMessagesContainer>
  );
}

export default ChatMessages;
