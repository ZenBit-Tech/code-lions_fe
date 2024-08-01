import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import styles from './styles';

interface IOrderSummarySectionProps {
  shipping: number;
  price: string;
}

const discount: number = 0;

function OrderSummarySection({ shipping, price }: IOrderSummarySectionProps) {
  const { t } = useTranslation();

  const total = useMemo(() => {
    return Number(price) - discount + shipping;
  }, [price, discount, shipping]);

  return (
    <Box sx={styles.orderSummaryWrapper}>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginBottom: '16px' }}
      >
        <Typography variant="h4">{t('vendorOrder.subtotal')}</Typography>
        <Typography variant="h4">{`$${price}`}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginBottom: '16px' }}
      >
        <Typography variant="h4">{t('vendorOrder.discount')}</Typography>
        <Typography variant="h4">{`-$${discount}`}</Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ marginBottom: '24px' }}
      >
        <Typography variant="h4">{t('vendorOrder.shipping')}</Typography>
        <Typography variant="h4">{`$${shipping}`}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">{t('vendorOrder.total')}</Typography>
        <Typography variant="h4">{`$${total}`}</Typography>
      </Box>
    </Box>
  );
}

export default OrderSummarySection;
