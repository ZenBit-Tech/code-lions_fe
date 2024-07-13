import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { selectUserId } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import createMenuData from './menuData';
import { MenuColumn, MenuLink, MenuMainLink } from './styles';

function FooterMenu() {
  const { t } = useTranslation();
  const userId = useSelector(selectUserId);

  const menuData = createMenuData(t, userId);

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        gap: '40px',
        [theme.breakpoints.up('lg')]: {
          gap: '80px',
        },
      }}
    >
      {menuData.map((column) => (
        <MenuColumn key={column.id}>
          <MenuMainLink to={column.mainLink.to}>
            {column.mainLink.label}
          </MenuMainLink>
          {column.links.map((link) => (
            <MenuLink key={link.id} to={link.to}>
              {link.label}
            </MenuLink>
          ))}
        </MenuColumn>
      ))}
    </Box>
  );
}

export default FooterMenu;
