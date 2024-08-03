import { Link } from 'react-router-dom';

import { urls } from 'src/common/constants';
import { ChatPartnerWithStatus, UserRole } from 'src/common/types';
import { useAppSelector } from 'src/redux/hooks';
import { useGetPublicUserByIdQuery } from 'src/redux/user/userService';

import { StyledTypography } from './styles.ts';

type Props = {
  chatPartner: ChatPartnerWithStatus | undefined;
};

function ChatLink({ chatPartner }: Props) {
  const userId = chatPartner?.id;
  const chatPartnerName = chatPartner?.name;
  const userRole = useAppSelector((state) => state.user.role);
  const { data: chatPartnerData } = useGetPublicUserByIdQuery(userId ?? '', {
    skip: !userId,
  });
  const chatPartnerRole = chatPartnerData?.role;

  if (!userId || !chatPartnerName) {
    return null;
  }

  if (userRole === UserRole.VENDOR && chatPartnerRole !== UserRole.ADMIN) {
    return (
      <Link to={`${urls.VENDOR}/${urls.BUYER}/${userId}`}>
        <StyledTypography>{chatPartnerName}</StyledTypography>
      </Link>
    );
  }

  if (userRole === UserRole.BUYER && chatPartnerRole !== UserRole.ADMIN) {
    return (
      <Link to={`${urls.VENDOR}/${userId}`}>
        <StyledTypography>{chatPartnerName}</StyledTypography>
      </Link>
    );
  }

  if (chatPartnerRole === UserRole.ADMIN || userRole === UserRole.ADMIN) {
    return <StyledTypography>{chatPartnerName}</StyledTypography>;
  }

  return null;
}

export default ChatLink;
