import PdfLogo from 'src/assets/icons/pdf.svg';
import { userRoles } from 'src/common/constants';
import { ContentType, IMessage } from 'src/common/types.ts';
import formatDateForChatList from 'src/common/utils/formatDateForChat';
import { useAppSelector } from 'src/redux/hooks';

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

function linkForVendor(link: string) {
  return link.replace('/products/', '/public-product/');
}

function RenderContent(content: string, contentType: ContentType) {
  const user = useAppSelector((state) => state.user);

  switch (contentType) {
    case ContentType.TEXT:
      return content;

    case ContentType.LINK: {
      const link =
        user.role === userRoles.VENDOR ? linkForVendor(content) : content;

      return <a href={link}>{link}</a>;
    }

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
