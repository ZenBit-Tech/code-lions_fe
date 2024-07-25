import { useEffect, useRef } from 'react';

import { TextField, InputAdornment, IconButton } from '@mui/material';

import { Chat } from 'common/types.ts';
import SendMessageIcon from 'src/assets/icons/SendMessage.svg';
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
import useChatSocket from './useChatSocket';

type Props = {
  chat?: Chat;
};

function ChatMessages({ chat }: Props) {
  const { id: myId, accessToken } = useAppSelector((state) => state.user);
  const { inputValue, setInputValue, send } = useChatSocket({
    chatId: chat?.id,
    accessToken,
  });

  const bottomOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomOfMessagesRef.current) {
      bottomOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat?.messages]);

  return (
    <ChatMessagesContainer>
      <AvatarContainer>
        <StyledAvatar src={chat?.chatPartner?.photoUrl} />
        <StyledTypography>{chat?.chatPartner?.name}</StyledTypography>
      </AvatarContainer>
      <ChatWithTextBox>
        <ScrollableMessageBox>
          {chat?.messages?.map((messageElement) => (
            <MessageBody
              key={messageElement.id}
              message={messageElement}
              myId={myId}
            />
          ))}
          <div ref={bottomOfMessagesRef} />
        </ScrollableMessageBox>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
