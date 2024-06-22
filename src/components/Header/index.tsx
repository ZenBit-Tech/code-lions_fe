import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box } from '@mui/system';

import BagIcon from 'src/assets/icons/bag.svg';
import BellIcon from 'src/assets/icons/bell.svg';
import ProfileIcon from 'src/assets/icons/profile.svg';
import { urls } from 'src/common/constants';
import { MenuMainLink } from 'src/components/FooterMenu/styles';
import HeaderLogo from 'src/components/HeaderLogo';
import { useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme';

import SvgHover from './styles';

const countInBag = 0;

function Header() {
  const { t } = useTranslation();
  const userName = useAppSelector((state) => state.user.name);

  return (
    <Box
      component="header"
      sx={{
        display: 'none',
        width: '100%',
        minHeight: '68px',
        background: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 24px',
        },
        [theme.breakpoints.up('xl')]: {
          padding: '0',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '30px',
          maxWidth: '1362px',
        }}
      >
        <Box
          sx={{
            marginTop: '9px',
          }}
        >
          <HeaderLogo />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: '40px',
            width: '316px',
          }}
        >
          <MenuMainLink to={urls.HOME}>{t('header.shop')}</MenuMainLink>
          <MenuMainLink to={urls.HOME}>{t('header.vendors')}</MenuMainLink>
          <MenuMainLink to={urls.HOME}>{t('header.messages')}</MenuMainLink>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            marginTop: '8px',
          }}
        >
          <Link to={urls.HOME}>
            <SvgHover>
              <BellIcon />
            </SvgHover>
          </Link>
          <Link to={urls.PROFILE} title={userName}>
            <SvgHover>
              <ProfileIcon />
            </SvgHover>
          </Link>
          <Link to={urls.HOME}>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ position: 'relative', top: '0', left: '0' }}>
                <SvgHover>
                  <BagIcon />
                </SvgHover>
              </Box>
              {countInBag > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-3px',
                    right: '0',
                    display: 'flex',
                    color: theme.palette.common.white,
                    fontSize: '7px',
                    minWidth: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: theme.palette.common.black,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {countInBag}
                </Box>
              )}
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Header;
