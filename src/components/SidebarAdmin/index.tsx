import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import {
  Collapse,
  IconButton,
  List,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

import ChatsIcon from 'src/assets/icons/chats.svg';
import ChevronDown from 'src/assets/icons/chevron-down.svg';
import ChevronUp from 'src/assets/icons/chevron-up.svg';
import ProductsIcon from 'src/assets/icons/products.svg';
import UsersIcon from 'src/assets/icons/users.svg';
import { urls, userRoles } from 'src/common/constants';
import theme from 'src/theme';

import Logo from './Logo';
import { StyledListItemButton, StyledSubListItemButton } from './styles';

function SideBar() {
  const [openUsers, setOpenUsers] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  const { t } = useTranslation();

  const location = useLocation();

  const handleUsersClick = () => {
    setOpenUsers(!openUsers);
  };

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  const usersActive = () => {
    return (
      location.pathname.includes(urls.ADMIN_VENDORS) ||
      location.pathname.includes(urls.ADMIN_BUYERS) ||
      location.pathname.includes(urls.ADMIN_USERS)
    );
  };

  const productsActive = () => {
    return (
      location.pathname.includes(urls.ADMIN_PRODUCT_LIST) ||
      location.pathname.includes(urls.ADMIN_PRODUCT_REQUEST)
    );
  };

  return (
    <>
      <Box marginBottom="35px" height="50px" width="100%">
        <Logo logoColor="black" />
      </Box>
      <List component="nav">
        <NavLink to={urls.ADMIN_USERS} state={{ role: undefined }}>
          <StyledListItemButton
            selected={usersActive()}
            onClick={handleUsersClick}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              width="140px"
            >
              <ListItemIcon sx={{ minWidth: '24px' }}>
                <UsersIcon />
              </ListItemIcon>
              {usersActive() ? (
                <Typography
                  variant="subtitle1"
                  sx={{ marginLeft: '12px', fontSize: '16px' }}
                >
                  {t('sidebar.users')}
                </Typography>
              ) : (
                <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                  {t('sidebar.users')}
                </Typography>
              )}
            </Box>
            {usersActive() && openUsers ? (
              <IconButton onClick={handleUsersClick}>
                <ChevronUp />
              </IconButton>
            ) : (
              <IconButton onClick={handleUsersClick}>
                <ChevronDown />
              </IconButton>
            )}
          </StyledListItemButton>
        </NavLink>

        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              borderLeft: `1px solid ${theme.palette.border.secondary}`,
              marginLeft: '30px',
              marginBottom: '12px',
            }}
          >
            <NavLink to={urls.ADMIN_BUYERS} state={{ role: userRoles.BUYER }}>
              {({ isActive }) => (
                <StyledSubListItemButton selected={isActive}>
                  <Typography variant="h4">{t('sidebar.buyers')}</Typography>
                </StyledSubListItemButton>
              )}
            </NavLink>
            <NavLink to={urls.ADMIN_VENDORS} state={{ role: userRoles.VENDOR }}>
              {({ isActive }) => (
                <StyledSubListItemButton selected={isActive}>
                  <Typography variant="h4">{t('sidebar.vendors')}</Typography>
                </StyledSubListItemButton>
              )}
            </NavLink>
          </List>
        </Collapse>

        <NavLink to={urls.ADMIN_PRODUCT_REQUEST}>
          <StyledListItemButton
            selected={productsActive()}
            onClick={handleProductsClick}
          >
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              width="140px"
            >
              <ListItemIcon sx={{ minWidth: '24px' }}>
                <ProductsIcon />
              </ListItemIcon>
              {productsActive() ? (
                <Typography
                  variant="subtitle1"
                  sx={{ marginLeft: '12px', fontSize: '16px' }}
                >
                  {t('sidebar.products')}
                </Typography>
              ) : (
                <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                  {t('sidebar.products')}
                </Typography>
              )}
            </Box>
            {productsActive() && openProducts ? (
              <IconButton onClick={handleProductsClick}>
                <ChevronUp />
              </IconButton>
            ) : (
              <IconButton onClick={handleProductsClick}>
                <ChevronDown />
              </IconButton>
            )}
          </StyledListItemButton>
        </NavLink>

        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              borderLeft: `1px solid ${theme.palette.border.secondary}`,
              marginLeft: '30px',
              marginBottom: '12px',
            }}
          >
            <NavLink to={urls.ADMIN_PRODUCT_REQUEST}>
              {({ isActive }) => (
                <StyledSubListItemButton selected={isActive}>
                  <Typography variant="h4">{t('sidebar.requests')}</Typography>
                </StyledSubListItemButton>
              )}
            </NavLink>
            <NavLink to={urls.ADMIN_PRODUCT_LIST}>
              {({ isActive }) => (
                <StyledSubListItemButton selected={isActive}>
                  <Typography variant="h4">
                    {t('sidebar.productsList')}
                  </Typography>
                </StyledSubListItemButton>
              )}
            </NavLink>
          </List>
        </Collapse>

        <NavLink to={urls.ADMIN_CHATS}>
          {({ isActive }) => (
            <StyledListItemButton selected={isActive}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                width="140px"
              >
                <ListItemIcon sx={{ minWidth: '24px' }}>
                  <ChatsIcon />
                </ListItemIcon>
                {isActive ? (
                  <Typography
                    variant="subtitle1"
                    sx={{ marginLeft: '12px', fontSize: '16px' }}
                  >
                    {t('sidebar.chats')}
                  </Typography>
                ) : (
                  <Typography sx={{ marginLeft: '12px', fontWeight: '500' }}>
                    {t('sidebar.chats')}
                  </Typography>
                )}
              </Box>
            </StyledListItemButton>
          )}
        </NavLink>
      </List>
    </>
  );
}

export default SideBar;
