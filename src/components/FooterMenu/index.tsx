import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import { useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme';

import createMenuData from './menuData';
import { MenuColumn, MenuLink, MenuMainLink } from './styles';

function FooterMenu() {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const { role, id: userId } = user;

  const menuData = createMenuData(t, role, userId);

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
