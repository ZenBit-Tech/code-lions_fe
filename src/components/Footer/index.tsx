import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import EmailIcon from 'src/assets/icons/email.svg';
import FacebookIcon from 'src/assets/icons/facebook.svg';
import InstagramIcon from 'src/assets/icons/instagram.svg';
import { socialNetworkLinks } from 'src/common/constants';
import FooterMenu from 'src/components/FooterMenu';
import HeaderLogo from 'src/components/HeaderLogo';
import theme from 'src/theme';

import { SocialMediaButtons, SocialMediaButton } from './styles';

function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        display: 'none',
        width: '100%',
        minHeight: '381px',
        marginTop: '120px',
        paddingTop: '74px',
        background: theme.palette.background.paper,
        [theme.breakpoints.up('md')]: {
          display: 'block',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          minHeight: '162px',
          margin: '0 auto',
          [theme.breakpoints.up('md')]: {
            maxWidth: '90%',
          },
          [theme.breakpoints.up('xl')]: {
            maxWidth: '1265px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '180px',
          }}
        >
          <Box sx={{ marginTop: '8px' }}>
            <HeaderLogo />
          </Box>
          <Typography
            sx={{
              marginTop: '14px',
              lineHeight: '162%',
              letterSpacing: '0',
              color: theme.palette.text.disabled,
            }}
          >
            {t('footer.someText')}
          </Typography>
          <SocialMediaButtons sx={{ marginTop: '24px' }}>
            <SocialMediaButton
              href={socialNetworkLinks.FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </SocialMediaButton>
            <SocialMediaButton
              href={socialNetworkLinks.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </SocialMediaButton>
            <SocialMediaButton
              href={socialNetworkLinks.EMAIL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <EmailIcon />
            </SocialMediaButton>
          </SocialMediaButtons>
        </Box>
        <FooterMenu />
      </Box>
      <Box
        sx={{
          height: '48px',
          margin: '71px auto 0',
          paddingTop: '24px',
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderTopColor: theme.palette.border.light,
          [theme.breakpoints.up('md')]: {
            maxWidth: '90%',
          },
          [theme.breakpoints.up('xl')]: {
            maxWidth: '1336px',
          },
        }}
      >
        <Typography variant="subtitle2">{t('footer.copyright')}</Typography>
      </Box>
    </Box>
  );
}

export default Footer;
