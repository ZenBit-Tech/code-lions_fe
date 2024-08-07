import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import { orderStatus as orderStatuses } from 'src/common/constants';
import StyledButton from 'src/components/shared/StyledButton';
import { StyleVariants } from 'src/components/shared/StyledButton/types';
import theme from 'src/theme';

import { StyledCard, StyledImage, StyledCardFooter } from './styles';

type OrderCardProps = {
  orderId: number;
  orderStatus: (typeof orderStatuses)[keyof typeof orderStatuses];
  productsQuantity: number;
  productsPhotos: string[];
};

function OrderCard({
  orderId,
  productsQuantity,
  productsPhotos,
  orderStatus,
}: OrderCardProps) {
  const { t } = useTranslation();

  return (
    <StyledCard>
      <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
        {t('profileOrders.order')} #{orderId}
      </Typography>
      <Typography variant="h4" sx={{ textDecoration: 'underline' }}>
        {productsQuantity} {t('profileOrders.items')}
      </Typography>
      <Box sx={{ display: 'flex', gap: '4px' }}>
        {productsPhotos.map((productPhoto) => (
          <StyledImage src={productPhoto} key={productPhoto} />
        ))}
      </Box>
      <Typography sx={{ color: theme.palette.text.disabled }}>
        {t('profileOrders.freeReturn')}:{' '}
        <Typography
          component="span"
          sx={{
            fontWeight: theme.typography.bold,
            color: theme.palette.common.black,
          }}
        >
          05d
        </Typography>
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{ color: theme.palette.text.disabled, fontSize: '10px' }}
      >
        {t('profileOrders.warning')}
      </Typography>
      <StyledCardFooter>
        <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
          {t('profileOrders.status')}: {orderStatus}
        </Typography>
        <StyledButton styles={StyleVariants.TRANSPARENT} type="button">
          {t('profileOrders.return')}
        </StyledButton>
      </StyledCardFooter>
    </StyledCard>
  );
}

export default OrderCard;
