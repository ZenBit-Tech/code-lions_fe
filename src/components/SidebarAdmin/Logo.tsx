import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

interface ILogoProps {
  logoColor: string;
}

function Logo({ logoColor }: ILogoProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
        padding: '10px',
      }}
    >
      <Box
        sx={{
          width: '24px',
          height: '24px',
          backgroundColor: logoColor,
          marginRight: '5px',
          borderRadius: '50%',
          display: 'inline-block',
        }}
      />
      <Typography variant="h1" sx={{ color: logoColor }}>
        {t('logoTitle')}
      </Typography>
    </Box>
  );
}

export default Logo;
