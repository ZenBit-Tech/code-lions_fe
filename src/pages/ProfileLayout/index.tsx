import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { Avatar, Grid } from '@mui/material';
import { Box } from '@mui/system';

import SectionTitle from 'src/components/shared/SectionTitle';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserName } from 'src/redux/user/userSlice';

import ProfileMenu from './ProfileMenu';
import {
  AvatarWrapper,
  NameTitle,
  OutletWrapper,
  SideBarWrapper,
  SubTitle,
} from './styles';

function ProfileLayout() {
  const { t } = useTranslation();
  const userName = useAppSelector(selectUserName) ?? t('profile.name');

  return (
    <>
      <Grid container sx={{ height: '100vh' }} columns={4}>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <SectionTitle
            title={t('profile.title')}
            greyBackground
            showNotification
            ml="14px"
          />
        </Grid>
        <Grid item xs={4} md={1}>
          <SideBarWrapper>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '100%',
                flexGrow: 1,
              }}
            >
              <AvatarWrapper>
                <Avatar
                  src="src/assets/photos/avatar.jpg"
                  sx={{ width: '120px', height: '120px' }}
                />
                <NameTitle variant="subtitle1">{userName}</NameTitle>
              </AvatarWrapper>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  flexGrow: 1,
                  flexShrink: 0,
                }}
              >
                <SubTitle variant="subtitle1">
                  {t('profile.buyerMode')}
                </SubTitle>
                <ProfileMenu />
              </Box>
            </Box>
          </SideBarWrapper>
        </Grid>
        <OutletWrapper item xs={4} md={3} height="100%">
          <Outlet />
        </OutletWrapper>
      </Grid>
      {/* <SimpleSection>
        <Container width="100vw">
          <SectionTitle
            title={t('profile.title')}
            greyBackground
            showNotification
          />
          <Box display="flex" padding="40px 54px" gap="32px">
            <Box>
              <AvatarWrapper
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
              </AvatarWrapper>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb="16px"
              >
                <SubTitle variant="subtitle1">
                  {t('profile.buyerMode')}
                </SubTitle>
              </Box>
              <ProfileMenu />
            </Box>
            <Box>
              <Outlet />
            </Box>
          </Box>
        </Container>
      </SimpleSection> */}
    </>
  );
}

export default ProfileLayout;
