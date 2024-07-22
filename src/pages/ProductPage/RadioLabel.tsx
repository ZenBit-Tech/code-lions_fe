import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { eventalCategory } from 'src/common/constants';
import theme from 'src/theme';

interface IRadioLabelProps {
  price: number;
  duration: number;
  categories: string[];
}

function RadioLabel({ price, duration, categories }: IRadioLabelProps) {
  const { t } = useTranslation();

  const isEvental: boolean = categories.includes(eventalCategory);

  return (
    <Box display="flex" flexDirection="column" gap="5px">
      <Typography variant="button">
        {' '}
        {isEvental ? t('product.eventalRent') : t('product.oneTimeRental')}
      </Typography>
      <Typography variant="h4" sx={{ letterSpacing: '-1px' }}>
        {t('product.reserve', { duration })}
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
