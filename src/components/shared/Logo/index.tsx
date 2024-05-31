import { Box, Typography } from '@mui/material';
import theme from 'src/theme';
import { useTranslation } from 'react-i18next';

function Circle() {
  return (
    <Box
      sx={{
        width: '28px',
        height: '28px',
        backgroundColor: theme.palette.common.black,
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: '6.25px',
      }}
    />
  );
}

function Logo() {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Circle />
      <Typography
        variant="h1"
        sx={{ color: theme.palette.common.black, fontSize: '31.22px' }}
      >
        {t('logoTitle')}
      </Typography>
    </Box>
  );
}

export default Logo;
