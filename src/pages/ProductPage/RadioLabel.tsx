import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

function RadioLabel() {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" gap="5px">
      <Typography variant="button">{t('product.oneTimeRental')}</Typography>
      <Typography variant="h4" sx={{ letterSpacing: '-1px' }}>
        {t('product.reserve')}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: '21px' }}>
        {t('product.mockPriceRadio')}
      </Typography>
    </Box>
  );
}

export default RadioLabel;
