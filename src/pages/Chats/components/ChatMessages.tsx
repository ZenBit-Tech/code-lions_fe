import { TextField, InputAdornment, IconButton } from '@mui/material';

import { IMessage } from 'common/types.ts';
import SendMessageIcon from 'src/assets/icons/SendMessage.svg';

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
  messages: IMessage[];
};

function ChatMessages({ messages }: Props) {
  const myId = 1; /** * TODO get current user's id ***/
  const chatUser = messages.find((chat) => chat.author.id !== myId);

  return (
    <ChatMessagesContainer>
      <AvatarContainer>
        <StyledAvatar src={chatUser?.author.photo} />
        <StyledTypography>
          {`${chatUser?.author.firstName} ${chatUser?.author.lastName}`}
        </StyledTypography>
      </AvatarContainer>
      <ChatWithTextBox>
        <ScrollableMessageBox>
          {messages.map((messageElement) => (
            <MessageBody
              key={messageElement.id}
              message={messageElement}
              myId={myId}
            />
          ))}
        </ScrollableMessageBox>
        <TextField
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
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
