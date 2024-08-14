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
  timer: number;
};

function OrderCard({
  orderId,
  productsQuantity,
  productsPhotos,
  orderStatus,
  timer,
}: OrderCardProps) {
  const { t } = useTranslation();

  function millisecondsToDays(milliseconds: number): number {
    const millisecondsInADay = 86400000;

    return Math.floor(Math.abs(milliseconds) / millisecondsInADay);
  }

  const getButton = (status: OrderCardProps['orderStatus']) => {
    if (status === orderStatuses.OVERDUE) {
      return (
        <StyledButton styles={StyleVariants.BLACK} type="button">
          {t('profileOrders.pay')}
        </StyledButton>
      );
    }

    return (
      <StyledButton styles={StyleVariants.TRANSPARENT} type="button">
        {t('profileOrders.seeDetails')}
      </StyledButton>
    );
  };

  const days = millisecondsToDays(timer);
  const isOverdue = timer < 0;

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
      {timer && (
        <>
          <Typography sx={{ color: theme.palette.text.disabled }}>
            {isOverdue
              ? t('profileOrders.daysInOverdue')
              : t('profileOrders.rentalDaysLeft')}
            :{' '}
            <Typography
              component="span"
              sx={{
                fontWeight: theme.typography.bold,
                color: theme.palette.common.black,
              }}
            >
              {days}
            </Typography>
          </Typography>
          {isOverdue && (
            <Typography
              variant="subtitle2"
              sx={{ color: theme.palette.text.disabled, fontSize: '10px' }}
            >
              {t('profileOrders.warning')}
            </Typography>
          )}
        </>
      )}
      <StyledCardFooter>
        <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
          {t('profileOrders.status')}: {orderStatus}
        </Typography>
        {getButton(orderStatus)}
      </StyledCardFooter>
    </StyledCard>
  );
}

export default OrderCard;
