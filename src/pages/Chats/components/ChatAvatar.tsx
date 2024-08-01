import { useTranslation } from 'react-i18next';

import { Chat, ChatPartnerWithStatus } from 'common/types.ts';
import formatDateForChat from 'src/common/utils/formatDateForChat';

import {
  AvatarContainer,
  StyledAvatar,
  StyledTypography,
  LastMessage as LastActive,
} from './styles.ts';

type Props = {
  chat: Chat | undefined;
  chatPartner: ChatPartnerWithStatus;
};

function ChatAvatar({ chat, chatPartner }: Props) {
  const { t } = useTranslation();

  return (
    <AvatarContainer>
      <StyledAvatar src={chat?.chatPartner?.photoUrl} />
      <div>
        <StyledTypography>{chat?.chatPartner?.name}</StyledTypography>
        <LastActive>
          {chatPartner.isOnline
            ? t('chat.online')
            : `${t('chat.active')}${formatDateForChat(chatPartner.lastActiveAt)}`}
        </LastActive>
      </div>
    </AvatarContainer>
  );
}

export default ChatAvatar;
