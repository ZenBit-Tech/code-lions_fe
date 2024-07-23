import { Chat } from 'common/types.ts';
import formatDateForChatList from 'src/common/utils/formatDateForChat.ts';

import {
  ChatDetails,
  ChatItem,
  ChatHeader,
  LastMessageDate,
  LastMessage,
  UnreadMessages,
  StyledAvatar,
  FullName,
} from './styles';

type Props = {
  chat: Chat;
};

function ChatDetail({ chat }: Props) {
  return (
    <>
      <ChatItem key={chat.fullName}>
        <StyledAvatar src={chat.photo} />
        <ChatDetails>
          <ChatHeader>
            <FullName>{chat.fullName}</FullName>
            <LastMessageDate>
              {formatDateForChatList(chat.lastMessageDate)}
            </LastMessageDate>
          </ChatHeader>
          <ChatHeader>
            <LastMessage>{chat.lastMessage}</LastMessage>
            <UnreadMessages>{chat.unreadMessages}</UnreadMessages>
          </ChatHeader>
        </ChatDetails>
      </ChatItem>
    </>
  );
}

export default ChatDetail;
