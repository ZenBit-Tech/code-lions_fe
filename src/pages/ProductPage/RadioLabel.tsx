import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import theme from 'src/theme';

interface IRadioLabelProps {
  price: number;
}

function RadioLabel({ price }: IRadioLabelProps) {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" gap="5px">
      <Typography variant="button">{t('product.oneTimeRental')}</Typography>
      <Typography variant="h4" sx={{ letterSpacing: '-1px' }}>
        {t('product.reserve')}
      </Typography>
      <Typography
        variant="body1"
        sx={{ fontWeight: theme.typography.h4.fontWeight, lineHeight: '21px' }}
      >
        {`$${price}`}
      </Typography>
    </Box>
  );
}

export default RadioLabel;
