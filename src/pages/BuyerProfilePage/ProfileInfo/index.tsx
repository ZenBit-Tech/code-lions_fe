import { Avatar } from '@mui/material';
import { Box } from '@mui/system';

import NotificationIcon from 'src/assets/icons/profile/notification.svg';
import StarIcon from 'src/assets/icons/profile/star.svg';
import RaitingOrdersIcon from 'src/assets/icons/vendor/raitingOrders.svg';
import theme from 'src/theme.tsx';

import { IconButtonStyled, NameTitle, TitleWrapper, Number } from './styles';

interface ProfileInfoProps {
  name: string;
  rating: number;
  avatar: string;
  orders: number;
}

function ProfileInfo({ name, rating, avatar, orders }: ProfileInfoProps) {
  return (
    <Box width="100%">
      <TitleWrapper>
        <IconButtonStyled theme={theme}>
          <NotificationIcon />
        </IconButtonStyled>
      </TitleWrapper>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap="12px"
        mt="16px"
        mb="20px"
      >
        <Avatar src={avatar} sx={{ width: '120px', height: '120px' }} />
        <NameTitle variant="subtitle1" theme={theme}>
          {name}
        </NameTitle>
        <Box display="flex" alignItems="center" marginLeft="auto">
          <RaitingOrdersIcon />
          <Number theme={theme}>{orders}</Number>
        </Box>
        <Box display="flex" alignItems="center" marginLeft="12px">
          <StarIcon />
          <Number theme={theme}>{rating}</Number>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileInfo;
