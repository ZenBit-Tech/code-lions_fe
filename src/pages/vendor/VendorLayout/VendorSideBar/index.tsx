import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { List, ListItemIcon, Typography, Box } from '@mui/material';

import ChatsIcon from 'src/assets/icons/vendor/chat.svg';
import DashboardIcon from 'src/assets/icons/vendor/dashboard.svg';
import OrdersIcon from 'src/assets/icons/vendor/orders.svg';
import PlusIcon from 'src/assets/icons/vendor/plus.svg';
import ProductsIcon from 'src/assets/icons/vendor/products.svg';
import ProfileIcon from 'src/assets/icons/vendor/profile.svg';
import { urls } from 'src/common/constants';
import StyledButton from 'src/components/shared/StyledButton';
import Logo from 'src/components/SidebarAdmin/Logo';
import { StyledListItemButton } from 'src/components/SidebarAdmin/styles';
import theme from 'src/theme';

const listIndexes = {
  dashboard: 0,
  products: 1,
  orders: 2,
  chats: 3,
  profile: 4,
};

function VendorSideBar() {
  const [selectedIndex, setSelectedIndex] = useState(listIndexes.dashboard);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Box marginBottom="40px" height="50px" width="100%">
        <Logo logoColor="black" />
      </Box>
      <StyledButton fullWidth onClick={() => navigate(urls.VENDOR_ADD_PRODUCT)}>
        <PlusIcon />
        <Typography ml="8px"> {t('vendorSidebar.addProduct')}</Typography>
      </StyledButton>
      <Box mt="28px">
        <List component="nav">
          <StyledListItemButton
            selected={selectedIndex === listIndexes.dashboard}
            onClick={(event) => {
              handleListItemClick(event, listIndexes.dashboard);
              navigate(urls.VENDOR_DASHBOARD);
            }}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              width="140px"
            >
              {selectedIndex === listIndexes.dashboard ? (
                <>
                  <ListItemIcon
                    sx={{ minWidth: '24px', fill: theme.palette.text.primary }}
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
                    sx={{ minWidth: '24px', fill: theme.palette.text.disabled }}
                  >
                    <DashboardIcon />
                  </ListItemIcon>
                  <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                    {t('vendorSidebar.dashboard')}
                  </Typography>
                </>
              )}
            </Box>
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === listIndexes.products}
            onClick={(event) => {
              handleListItemClick(event, listIndexes.products);
              navigate(urls.VENDOR_PRODUCTS);
            }}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              width="140px"
            >
              {selectedIndex === listIndexes.products ? (
                <>
                  <ListItemIcon
                    sx={{ minWidth: '24px', fill: theme.palette.text.primary }}
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
              ) : (
                <>
                  <ListItemIcon
                    sx={{ minWidth: '24px', fill: theme.palette.text.disabled }}
                  >
                    <ProductsIcon />
                  </ListItemIcon>
                  <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                    {t('vendorSidebar.products')}
                  </Typography>
                </>
              )}
            </Box>
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === listIndexes.orders}
            onClick={(event) => {
              handleListItemClick(event, listIndexes.orders);
              navigate(urls.VENDOR_ORDERS);
            }}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              width="140px"
            >
              {selectedIndex === listIndexes.orders ? (
                <>
                  <ListItemIcon
                    sx={{ minWidth: '24px', fill: theme.palette.text.primary }}
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
                    sx={{ minWidth: '24px', fill: theme.palette.text.disabled }}
                  >
                    <OrdersIcon />
                  </ListItemIcon>
                  <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                    {t('vendorSidebar.orders')}
                  </Typography>
                </>
              )}
            </Box>
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === listIndexes.chats}
            onClick={(event) => {
              handleListItemClick(event, listIndexes.chats);
              navigate(urls.VENDOR_CHATS);
            }}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              width="140px"
            >
              {selectedIndex === listIndexes.chats ? (
                <>
                  <ListItemIcon
                    sx={{ minWidth: '24px', fill: theme.palette.text.primary }}
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
                    sx={{ minWidth: '24px', fill: theme.palette.text.disabled }}
                  >
                    <ChatsIcon />
                  </ListItemIcon>
                  <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                    {t('vendorSidebar.chats')}
                  </Typography>
                </>
              )}
            </Box>
          </StyledListItemButton>

          <StyledListItemButton
            selected={selectedIndex === listIndexes.profile}
            onClick={(event) => {
              handleListItemClick(event, listIndexes.profile);
              navigate(urls.VENDOR_PROFILE);
            }}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              width="140px"
            >
              {selectedIndex === listIndexes.profile ? (
                <>
                  <ListItemIcon
                    sx={{ minWidth: '24px', fill: theme.palette.text.primary }}
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
                    sx={{ minWidth: '24px', fill: theme.palette.text.disabled }}
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
        </List>
      </Box>
    </>
  );
}

export default VendorSideBar;
