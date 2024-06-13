import { useTranslation } from 'react-i18next';
import { Avatar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserName } from 'src/redux/user/userSlice';
import SimpleSection from 'src/components/shared/SimpleSection';
import Container from 'src/components/shared/Container';
import SectionTitle from 'src/components/shared/SectionTitle';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import NotificationIcon from 'src/assets/icons/profile/notification.svg';
import ProfileMenu from './ProfileMenu';
import { IconButtonStyled, NameTitle, SubTitle, TitleWrapper } from './styles';

function ProfilePage() {
  const { t } = useTranslation();
  const userName = useAppSelector(selectUserName) ?? t('profile.name');

  return (
    <SimpleSection>
      <Container>
        <TitleWrapper>
          <SectionTitle title={t('profile.title')} />
          <IconButtonStyled>
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
          <NameTitle variant="subtitle1">{userName}</NameTitle>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="16px"
        >
          <SubTitle variant="subtitle1">{t('profile.buyerMode')}</SubTitle>
          <StyledButton
            type="button"
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.SM}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 400,
                lineHeight: 'normal',
                letterSpacing: 'normal',
              }}
            >
              {t('profile.goToVendor')}
            </Typography>
          </StyledButton>
        </Box>
        <ProfileMenu />
      </Container>
    </SimpleSection>
  );
}

export default ProfilePage;
