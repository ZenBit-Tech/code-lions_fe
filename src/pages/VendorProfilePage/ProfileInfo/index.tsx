import { useTranslation } from 'react-i18next';

import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';

import NotificationIcon from 'src/assets/icons/profile/notification.svg';
import StarIcon from 'src/assets/icons/profile/star.svg';
import Container from 'src/components/shared/Container';
import SimpleSection from 'src/components/shared/SimpleSection';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import theme from 'src/theme.tsx';

import {
  IconButtonStyled,
  NameTitle,
  TitleWrapper,
  FollowButtonWrapper,
  RatingNumber,
} from './styles';

function ProfilePage() {
  const { t } = useTranslation();
  const userName = t('profile.name');

  return (
    <SimpleSection>
      <Container>
        <TitleWrapper>
          <IconButtonStyled theme={theme}>
            <NotificationIcon />
          </IconButtonStyled>
        </TitleWrapper>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="12px"
          mt="16px"
          mb="20px"
        >
          <Avatar
            src="src/assets/photos/avatar.jpg"
            sx={{ width: '120px', height: '120px' }}
          />
          <NameTitle variant="subtitle1" theme={theme}>
            {userName}
          </NameTitle>
          <Box display="flex" alignItems="center" marginBottom="20px">
            <StarIcon />
            <RatingNumber theme={theme}>5.0</RatingNumber>
          </Box>
        </Box>
        <FollowButtonWrapper theme={theme}>
          <StyledButton
            type="button"
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.LG}
            sx={{
              width: '196px',
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 400,
                lineHeight: 'normal',
                letterSpacing: 'normal',
              }}
            >
              {t('vendorProfile.follow')}
            </Typography>
          </StyledButton>
        </FollowButtonWrapper>
      </Container>
    </SimpleSection>
  );
}

export default ProfilePage;
