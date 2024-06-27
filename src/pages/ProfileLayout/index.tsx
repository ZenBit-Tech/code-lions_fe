import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

import { Avatar, Grid } from '@mui/material';
import { Box } from '@mui/system';

import { urls } from 'src/common/constants';
import SectionTitle from 'src/components/shared/SectionTitle';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserAvatar, selectUserName } from 'src/redux/user/userSlice';

import PhotoUploadForm from '../ProfilePage/PhotoUploadForm';

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
  const location = useLocation();
  const userName = useAppSelector(selectUserName) ?? t('profile.name');
  const userAvatar = useAppSelector(selectUserAvatar) ?? '';

  const isProfileDetails =
    location.pathname === `${urls.PROFILE}/${urls.PROFILE_DETAILS}`;

  return (
    <>
      <Grid container columns={4}>
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
                {isProfileDetails ? (
                  <PhotoUploadForm />
                ) : (
                  <Avatar
                    src={`${import.meta.env.VITE_API_URL}${userAvatar}`}
                    sx={{ width: '120px', height: '120px' }}
                  />
                )}
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
    </>
  );
}

export default ProfileLayout;
