import { ChatWithMainData } from 'common/types.ts';
import formatDateForChat from 'src/common/utils/formatDateForChat';

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
  onClick: () => void;
  chat: ChatWithMainData;
};

function ChatDetail({ chat, onClick }: Props) {
  return (
    <>
      <ChatItem onClick={onClick} key={chat.chatPartner.name}>
        <StyledAvatar src={chat.chatPartner.photoUrl} />
        <ChatDetails>
          <ChatHeader>
            <FullName>{chat.chatPartner.name}</FullName>
            <LastMessageDate>
              {formatDateForChat(chat.lastMessage.createdAt)}
            </LastMessageDate>
          </ChatHeader>
          <ChatHeader>
            <LastMessage>{chat.lastMessage.content}</LastMessage>
            <UnreadMessages>{chat.unreadMessageCount}</UnreadMessages>
          </ChatHeader>
        </ChatDetails>
      </ChatItem>
    </>
  );
}

export default ChatDetail;
