import { ChatPartnerWithStatus } from 'common/types.ts';
import TypingIcon from 'src/assets/icons/typing.svg';

import {
  SenderMessage,
  StyledMessageAvatar,
  AvatarMessageContainer,
  Typing,
} from './styles.ts';

export type Props = {
  chatPartner: ChatPartnerWithStatus;
};

function SenderTyping({ chatPartner }: Props) {
  return (
    <SenderMessage>
      <AvatarMessageContainer>
        <StyledMessageAvatar src={chatPartner.photoUrl} />
        <Typing>
          <TypingIcon />
        </Typing>
      </AvatarMessageContainer>
    </SenderMessage>
  );
}

export default SenderTyping;
