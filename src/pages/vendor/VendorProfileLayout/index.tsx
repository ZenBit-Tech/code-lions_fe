import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { Avatar, Grid } from '@mui/material';
import { Box } from '@mui/system';

import { apiUrl } from 'src/common/constants.ts';
import useProfileTitle from 'src/pages/ProfileLayout/hooks/useProfileTitle';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserAvatar, selectUserName } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import VendorSectionTitle from '../VendorSectionTitle';

import {
  AvatarWrapper,
  MainGrid,
  NameTitle,
  OutletWrapper,
  SideBarWrapper,
  SubTitle,
} from './styles';
import VendorProfileMenu from './VendorProfileMenu';

function VendorProfileLayout() {
  const { t } = useTranslation();
  const title = useProfileTitle();
  const userName = useAppSelector(selectUserName) ?? t('profile.name');
  const userAvatar = useAppSelector(selectUserAvatar) ?? '';

  return (
    <>
      <Grid container columns={4}>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column' }}>
          <VendorSectionTitle title={title} />
        </Grid>
        <MainGrid item xs={4} container columns={4}>
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
                    src={`${apiUrl}${userAvatar}`}
                    sx={{ width: '120px', height: '120px' }}
                  />
                  <NameTitle
                    variant="subtitle1"
                    sx={{ fontSize: theme.typography.h5.fontSize }}
                  >
                    {userName}
                  </NameTitle>
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
                  <SubTitle
                    variant="subtitle1"
                    sx={{
                      fontSize: theme.typography.h3.fontSize,
                      [theme.breakpoints.up('sm')]: {
                        lineHeight: 2.31,
                      },
                    }}
                  >
                    {t('profile.vendorMode')}
                  </SubTitle>
                  <VendorProfileMenu />
                </Box>
              </Box>
            </SideBarWrapper>
          </Grid>
          <OutletWrapper item xs={4} md={3} height="100%">
            <Outlet />
          </OutletWrapper>
        </MainGrid>
      </Grid>
    </>
  );
}

export default VendorProfileLayout;
