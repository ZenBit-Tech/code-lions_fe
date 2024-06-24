import { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

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
import getInitials from 'src/common/getInitials';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserName } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import { StyledAvatar, StyledMenuItem } from './styles';

function HeaderAdmin() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const userName = useAppSelector(selectUserName) ?? t('headerAdmin.mockName');
  const initials = getInitials(userName) ?? t('headerAdmin.mockAvatar');

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
          <StyledAvatar>
            <Typography color={theme.palette.common.white}>
              {initials}
            </Typography>
          </StyledAvatar>
          <Box display="flex" flexDirection="column" marginRight="30px">
            <Typography
              variant="subtitle1"
              sx={{ fontSize: '16px', marginBottom: '4px' }}
            >
              {userName}
            </Typography>
            <Typography
              variant="overline"
              sx={{ color: theme.palette.text.disabled }}
            >
              {t('headerAdmin.mockRole')}
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
          <StyledMenuItem>
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

export default HeaderAdmin;
