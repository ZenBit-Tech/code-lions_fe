import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box } from '@mui/system';

import BagIcon from 'src/assets/icons/bag.svg';
import BellIcon from 'src/assets/icons/bell.svg';
import ProfileIcon from 'src/assets/icons/profile.svg';
import { urls } from 'src/common/constants';
import { MenuMainLink } from 'src/components/FooterMenu/styles';
import HeaderLogo from 'src/components/HeaderLogo';
import StyledButton from 'src/components/shared/StyledButton';
import { StyleVariants } from 'src/components/shared/StyledButton/types';
import { useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme';

import SvgHover from './styles';

const countInBag = 0;

function Header() {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);

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
          height: '32px',
          maxWidth: '1362px',
        }}
      >
        <Box
          sx={{
            marginTop: '12px',
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
            alignItems: 'center',
            gap: '30px',
          }}
        >
          {user.isLoggedIn ? (
            <>
              <Link to={urls.HOME}>
                <SvgHover>
                  <BellIcon />
                </SvgHover>
              </Link>
              <Link to={urls.PROFILE} title={user.name}>
                <SvgHover>
                  <ProfileIcon />
                </SvgHover>
              </Link>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '9px' }}>
              <Link to={urls.SIGN_IN}>
                <StyledButton
                  styles={StyleVariants.BLACK}
                  variant="contained"
                  fontSize="14px"
                  fontFamily={theme.typography.fontFamily}
                  sx={{
                    padding: '8px 21px',
                    fontWeight: '500',
                    color: theme.palette.common.white,
                    letterSpacing: '-0.56px',
                    lineHeight: '16px',
                  }}
                >
                  {t('header.login')}
                </StyledButton>
              </Link>
              <Link to={urls.SIGN_UP}>
                <StyledButton
                  styles={StyleVariants.WHITE}
                  variant="contained"
                  fontSize="14px"
                  fontFamily={theme.typography.fontFamily}
                  sx={{
                    padding: '8px 15px',
                    fontWeight: '500',
                    color: theme.palette.common.black,
                    letterSpacing: '-0.56px',
                    lineHeight: '16px',
                  }}
                >
                  {t('header.signUp')}
                </StyledButton>
              </Link>
            </Box>
          )}

          <Link to={urls.HOME}>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ position: 'relative', top: '2px', right: '1px' }}>
                <SvgHover>
                  <BagIcon />
                </SvgHover>
              </Box>
              {countInBag > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-2px',
                    right: '0px',
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
