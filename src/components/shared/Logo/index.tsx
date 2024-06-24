import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { urls } from 'src/common/constants';

interface ILogoProps {
  logoColor: string;
}

function Logo({ logoColor }: ILogoProps) {
  const { t } = useTranslation();

  return (
    <Link to={urls.HOME}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '63px',
          marginTop: '42px',
          position: 'absolute',
        }}
      >
        <Box
          sx={{
            width: '28px',
            height: '28px',
            backgroundColor: logoColor,
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '6.25px',
          }}
        />
        <Typography variant="h2" sx={{ color: logoColor }}>
          {t('logoTitle')}
        </Typography>
      </Box>
    </Link>
  );
}

export default Logo;
