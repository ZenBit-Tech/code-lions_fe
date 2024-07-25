import { IMessage } from 'common/types.ts';
import formatDateForChatList from 'src/common/utils/formatDateForChat';

import {
  SenderMessage,
  OwnMessage,
  SenderMessageBody,
  OwnMessageBody,
  StyledMessageAvatar,
  AvatarMessageContainer,
  LastMessageDate,
} from './styles.ts';

export type Props = {
  message: IMessage;
  myId: string;
};

function MessageBody({ message, myId }: Props) {
  if (myId !== message.sender?.id) {
    return (
      <SenderMessage>
        <div>
          <AvatarMessageContainer>
            <StyledMessageAvatar src={message.sender?.photoUrl} />
            <SenderMessageBody>{message.content}</SenderMessageBody>
          </AvatarMessageContainer>
          <LastMessageDate>
            {message.createdAt && formatDateForChatList(message.createdAt)}
          </LastMessageDate>
        </div>
      </SenderMessage>
    );
  } else {
    return (
      <OwnMessage>
        <div>
          <OwnMessageBody>{message.content}</OwnMessageBody>
          <LastMessageDate>
            {formatDateForChatList(message.createdAt)}
          </LastMessageDate>
        </div>
      </OwnMessage>
    );
  }
}

export default MessageBody;
