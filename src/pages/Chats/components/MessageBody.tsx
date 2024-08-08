import PdfLogo from 'src/assets/icons/pdf.svg';
import { ContentType, IMessage } from 'src/common/types.ts';
import formatDateForChatList from 'src/common/utils/formatDateForChat';

import {
  AvatarMessageContainer,
  LastMessageDate,
  OwnMessage,
  OwnMessageBody,
  SenderMessage,
  SenderMessageBody,
  StyledMessageAvatar,
  ChatImage,
} from './styles.ts';

export type Props = {
  message: IMessage;
  myId: string;
};

function RenderContent(content: string, contentType: ContentType) {
  switch (contentType) {
    case ContentType.TEXT:
      return content;

    case ContentType.LINK:
      return <a href={content}>{content}</a>;

    case ContentType.FILE:
      return (
        <a
          href={content}
          target="_blank"
          rel="noreferrer"
          aria-label="Open PDF"
        >
          <PdfLogo />
        </a>
      );

    default:
      return <ChatImage src={content} />;
  }
}

function MessageBody({ message, myId }: Props) {
  if (myId !== message.sender?.id) {
    return (
      <SenderMessage>
        <div>
          <AvatarMessageContainer>
            <StyledMessageAvatar src={message.sender?.photoUrl} />
            <SenderMessageBody>
              {RenderContent(message.content, message.contentType)}
            </SenderMessageBody>
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
          <OwnMessageBody>
            {RenderContent(message.content, message.contentType)}
          </OwnMessageBody>
          <LastMessageDate>
            {formatDateForChatList(message.createdAt)}
          </LastMessageDate>
        </div>
      </OwnMessage>
    );
  }
}

export default MessageBody;
