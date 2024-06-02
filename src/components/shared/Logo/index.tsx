import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ILogoProps {
  logoColor: string;
}

function Circle({ logoColor }: ILogoProps) {
  return (
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
  );
}

function Logo({ logoColor }: ILogoProps) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: '63px',
        marginTop: '42px',
        position: 'absolute',
      }}
    >
      <Circle logoColor={logoColor} />
      <Typography variant="h1" sx={{ color: logoColor, fontSize: '31.22px' }}>
        {t('logoTitle')}
      </Typography>
    </Box>
  );
}

export default Logo;
