import { useTranslation } from 'react-i18next';

import { Chat, ChatPartnerWithStatus } from 'common/types.ts';
import formatDateForChat from 'src/common/utils/formatDateForChat';

import ChatLink from './ChatLink';
import {
  AvatarContainer,
  StyledAvatar,
  LastMessage as LastActive,
} from './styles.ts';

type Props = {
  chat: Chat | undefined;
  chatPartner: ChatPartnerWithStatus | undefined;
};

function ChatAvatar({ chat, chatPartner }: Props) {
  const { t } = useTranslation();

  return (
    <AvatarContainer>
      <StyledAvatar src={chat?.chatPartner?.photoUrl} />
      <div>
        <ChatLink chatPartner={chatPartner} />
        <LastActive>
          {chatPartner?.isOnline
            ? t('chat.online')
            : chatPartner?.lastActiveAt &&
              `${t('chat.active')}${formatDateForChat(chatPartner.lastActiveAt)}`}
        </LastActive>
      </div>
    </AvatarContainer>
  );
}

export default ChatAvatar;
