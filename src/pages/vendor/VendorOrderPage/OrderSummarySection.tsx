import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import mockOrder from './mockData';
import styles from './styles';

function OrderSummarySection() {
  const { t } = useTranslation();

  return (
    <Box sx={styles.orderSummaryWrapper}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginBottom: '16px' }}
      >
        <Typography variant="h4">{t('vendorOrder.subtotal')}</Typography>
        <Typography variant="h4">{mockOrder.subtotal}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginBottom: '16px' }}
      >
        <Typography variant="h4">{t('vendorOrder.discount')}</Typography>
        <Typography variant="h4">{mockOrder.discount}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginBottom: '24px' }}
      >
        <Typography variant="h4">{t('vendorOrder.shipping')}</Typography>
        <Typography variant="h4">{mockOrder.shipping}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">{t('vendorOrder.total')}</Typography>
        <Typography variant="h4">{mockOrder.totalSum}</Typography>
      </Box>
    </Box>
  );
}

export default OrderSummarySection;
