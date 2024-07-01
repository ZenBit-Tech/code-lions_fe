import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Typography,
  Menu,
  Box,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import ChevronDown from 'src/assets/icons/chevron-down-grey.svg';
import ChevronUp from 'src/assets/icons/chevron-up-grey.svg';
import Logout from 'src/assets/icons/logout.svg';
import { urls } from 'src/common/constants';
import {
  StyledAvatar,
  StyledMenuItem,
} from 'src/components/HeaderAdmin/styles';
import { useAppSelector } from 'src/redux/hooks';
import {
  logout,
  selectUserAvatar,
  selectUserName,
} from 'src/redux/user/userSlice';
import theme from 'src/theme';

function VendorHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate(urls.SIGN_IN);
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const userName = useAppSelector(selectUserName) ?? t('headerAdmin.mockName');
  const userAvatar =
    useAppSelector(selectUserAvatar) ?? t('headerAdmin.mockAvatar');

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      padding="15px 24px"
      width="100%"
      height="70px"
      sx={{ borderLeft: `1px solid ${theme.palette.background.paper}` }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          borderLeft: `1px solid ${theme.palette.background.paper}`,
        }}
      >
        <Box display="flex" alignItems="center">
          <StyledAvatar src={`${import.meta.env.VITE_API_URL}${userAvatar}`} />
          <Box
            display="flex"
            flexDirection="column"
            marginRight="30px"
            justifyContent="center"
          >
            <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
              {userName}
            </Typography>
          </Box>
        </Box>
        <Box onClick={handleMenuOpen} sx={{ cursor: 'pointer' }}>
          {menuOpen ? <ChevronUp /> : <ChevronDown />}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            '.MuiMenu-paper': { backgroundColor: theme.palette.common.white },
          }}
        >
          <StyledMenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>{t('headerAdmin.logout')}</ListItemText>
          </StyledMenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default VendorHeader;