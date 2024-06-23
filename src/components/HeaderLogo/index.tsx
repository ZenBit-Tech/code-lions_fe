import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box, Typography, useTheme } from '@mui/material';

import { urls } from 'src/common/constants';

function HeaderLogo() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Link to={urls.HOME}>
      <Box
        sx={{
          display: 'flex',
          '&:hover': {
            color: theme.palette.text.disabled,
          },
          '&:hover .hoverEffect': {
            backgroundColor: theme.palette.text.disabled,
          },
        }}
      >
        <Box
          className="hoverEffect"
          sx={{
            width: '18px',
            height: '18px',
            backgroundColor: theme.palette.common.black,
            borderRadius: '50%',
            display: 'inline-block',
          }}
        />
        <Typography
          component="h4"
          variant="h1"
          sx={{
            margin: '-3px 0 0 4px',
            fontSize: '20px',
            letterSpacing: '-0.2px',
            textDecoration: 'none',
          }}
        >
          {t('logoTitle')}
        </Typography>
      </Box>
    </Link>
  );
}

export default HeaderLogo;
