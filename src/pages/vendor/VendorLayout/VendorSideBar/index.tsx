import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { List, ListItemIcon, Typography, Box } from '@mui/material';

import ChatsIcon from 'src/assets/icons/vendor/chat.svg';
import DashboardIcon from 'src/assets/icons/vendor/dashboard.svg';
import OrdersIcon from 'src/assets/icons/vendor/orders.svg';
import PlusIcon from 'src/assets/icons/vendor/plus.svg';
import ProductsIcon from 'src/assets/icons/vendor/products.svg';
import ProfileIcon from 'src/assets/icons/vendor/profile.svg';
import { urls } from 'src/common/constants';
import useUnreadChatsCount from 'src/common/hooks/useUnreadChatsCount';
import StyledButton from 'src/components/shared/StyledButton';
import Logo from 'src/components/SidebarAdmin/Logo';
import { StyledListItemButton } from 'src/components/SidebarAdmin/styles';
import { setAddProductStep } from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';
import theme from 'src/theme';

import UnreadMessages from './styles';

function VendorSideBar() {
  const unreadChatsCount = useUnreadChatsCount();

  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const profileActive = () => {
    return (
      location.pathname.includes(
        `${urls.VENDOR_PROFILE}/${urls.PROFILE_DETAILS}`
      ) ||
      location.pathname.includes(
        `${urls.VENDOR_PROFILE}/${urls.PROFILE_SETTINGS}`
      ) ||
      location.pathname.includes(
        `${urls.VENDOR_PROFILE}/${urls.PROFILE_SUPPORT}`
      )
    );
  };

  return (
    <>
      <Box marginBottom="40px" height="50px" width="100%">
        <Logo logoColor="black" />
      </Box>
      <StyledButton
        fullWidth
        onClick={() => {
          dispatch(setAddProductStep());
          navigate(urls.VENDOR_ADD_PRODUCT);
        }}
      >
        <PlusIcon />
        <Typography ml="8px"> {t('vendorSidebar.addProduct')}</Typography>
      </StyledButton>
      <Box mt="28px">
        <List component="nav">
          <NavLink to={urls.VENDOR_DASHBOARD}>
            {({ isActive }) => (
              <StyledListItemButton selected={isActive}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="140px"
                >
                  {isActive ? (
                    <>
                      <ListItemIcon
                        sx={{
                          minWidth: '24px',
                          fill: theme.palette.text.primary,
                        }}
                      >
                        <DashboardIcon />
                      </ListItemIcon>
                      <Typography
                        variant="subtitle1"
                        sx={{ marginLeft: '12px', fontSize: '16px' }}
                      >
                        {t('vendorSidebar.dashboard')}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <ListItemIcon
                        sx={{
                          minWidth: '24px',
                          fill: theme.palette.text.disabled,
                        }}
                      >
                        <DashboardIcon />
                      </ListItemIcon>
                      <Typography
                        sx={{ marginLeft: '12px', fontWeight: '500' }}
                      >
                        {t('vendorSidebar.dashboard')}
                      </Typography>
                    </>
                  )}
                </Box>
              </StyledListItemButton>
            )}
          </NavLink>

          <NavLink to={urls.VENDOR_PRODUCTS}>
            {({ isActive }) => (
              <StyledListItemButton selected={isActive}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="140px"
                >
                  {isActive ? (
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      width="140px"
                    >
                      <>
                        <ListItemIcon
                          sx={{
                            minWidth: '24px',
                            fill: theme.palette.text.primary,
                          }}
                        >
                          <ProductsIcon />
                        </ListItemIcon>
                        <Typography
                          variant="subtitle1"
                          sx={{ marginLeft: '12px', fontSize: '16px' }}
                        >
                          {t('vendorSidebar.products')}
                        </Typography>
                      </>
                    </Box>
                  ) : (
                    <>
                      <ListItemIcon
                        sx={{
                          minWidth: '24px',
                          fill: theme.palette.text.disabled,
                        }}
                      >
                        <ProductsIcon />
                      </ListItemIcon>
                      <Typography
                        sx={{ marginLeft: '12px', fontWeight: '500' }}
                      >
                        {t('vendorSidebar.products')}
                      </Typography>
                    </>
                  )}
                </Box>
              </StyledListItemButton>
            )}
          </NavLink>

          <NavLink to={urls.VENDOR_ORDERS}>
            {({ isActive }) => (
              <StyledListItemButton selected={isActive}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="140px"
                >
                  {isActive ? (
                    <>
                      <ListItemIcon
                        sx={{
                          minWidth: '24px',
                          fill: theme.palette.text.primary,
                        }}
                      >
                        <OrdersIcon />
                      </ListItemIcon>
                      <Typography
                        variant="subtitle1"
                        sx={{ marginLeft: '12px', fontSize: '16px' }}
                      >
                        {t('vendorSidebar.orders')}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <ListItemIcon
                        sx={{
                          minWidth: '24px',
                          fill: theme.palette.text.disabled,
                        }}
                      >
                        <OrdersIcon />
                      </ListItemIcon>
                      <Typography
                        sx={{ marginLeft: '12px', fontWeight: '500' }}
                      >
                        {t('vendorSidebar.orders')}
                      </Typography>
                    </>
                  )}
                </Box>
              </StyledListItemButton>
            )}
          </NavLink>

          <NavLink to={urls.VENDOR_CHATS}>
            {({ isActive }) => (
              <StyledListItemButton selected={isActive}>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  width="140px"
                >
                  {isActive ? (
                    <>
                      <ListItemIcon
                        sx={{
                          minWidth: '24px',
                          fill: theme.palette.text.primary,
                        }}
                      >
                        <ChatsIcon />
                      </ListItemIcon>

                      <Typography
                        variant="subtitle1"
                        sx={{ marginLeft: '12px', fontSize: '16px' }}
                      >
                        {t('vendorSidebar.chats')}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <ListItemIcon
                        sx={{
                          minWidth: '24px',
                          fill: theme.palette.text.disabled,
                        }}
                      >
                        <ChatsIcon />
                      </ListItemIcon>

                      <Typography
                        sx={{ marginLeft: '12px', fontWeight: '500' }}
                      >
                        {t('vendorSidebar.chats')}
                      </Typography>
                    </>
                  )}
                </Box>
                {unreadChatsCount !== 0 && (
                  <UnreadMessages>{unreadChatsCount}</UnreadMessages>
                )}
              </StyledListItemButton>
            )}
          </NavLink>

          <NavLink to={`${urls.VENDOR_PROFILE}/${urls.PROFILE_DETAILS}`}>
            <StyledListItemButton selected={profileActive()}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                width="140px"
              >
                {profileActive() ? (
                  <>
                    <ListItemIcon
                      sx={{
                        minWidth: '24px',
                        fill: theme.palette.text.primary,
                      }}
                    >
                      <ProfileIcon />
                    </ListItemIcon>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginLeft: '12px', fontSize: '16px' }}
                    >
                      {t('vendorSidebar.profile')}
                    </Typography>
                  </>
                ) : (
                  <>
                    <ListItemIcon
                      sx={{
                        minWidth: '24px',
                        fill: theme.palette.text.disabled,
                      }}
                    >
                      <ProfileIcon />
                    </ListItemIcon>
                    <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                      {t('vendorSidebar.profile')}
                    </Typography>
                  </>
                )}
              </Box>
            </StyledListItemButton>
          </NavLink>
        </List>
      </Box>
    </>
  );
}

export default VendorSideBar;
