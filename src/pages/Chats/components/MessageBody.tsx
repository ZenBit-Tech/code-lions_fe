import { IMessage } from 'common/types.ts';

import {
  SenderMessage,
  OwnMessage,
  SenderMessageBody,
  OwnMessageBody,
  AvatarMessageContainer,
  StyledMessageAvatar,
  LastMessageDate,
} from './styles.ts';

export type Props = {
  message: IMessage;
  myId: number;
};

function MessageBody({ message, myId }: Props) {
  if (myId !== message.author.id) {
    return (
      <SenderMessage>
        <div>
          <AvatarMessageContainer>
            <StyledMessageAvatar src={message.author.photo} />
            <SenderMessageBody>{message.messageBody}</SenderMessageBody>
          </AvatarMessageContainer>
          <LastMessageDate>{message.createdAt}</LastMessageDate>
        </div>
      </SenderMessage>
    );
  } else {
    return (
      <OwnMessage>
        <div>
          <OwnMessageBody>{message.messageBody}</OwnMessageBody>
          <LastMessageDate>{message.createdAt}</LastMessageDate>
        </div>
      </OwnMessage>
    );
  }
}

export default MessageBody;
