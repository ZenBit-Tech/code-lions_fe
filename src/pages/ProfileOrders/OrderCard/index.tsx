import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { orderStatus as orderStatuses, urls } from 'src/common/constants';
import millisecondsToDays from 'src/common/millisecondsToDays';
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
  trackingNumber: string | null;
};

function OrderCard({
  orderId,
  productsQuantity,
  productsPhotos,
  orderStatus,
  timer,
  trackingNumber,
}: OrderCardProps) {
  const { t } = useTranslation();

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
      {timer ? (
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
              {`${days} ${t('profileOrders.days')}`}
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
      ) : (
        <Typography sx={{ color: theme.palette.text.disabled }}>
          {t('profileOrders.trackingNumber')}:{' '}
          <Typography
            component="span"
            sx={{
              fontWeight: theme.typography.bold,
              color: theme.palette.common.black,
            }}
          >
            {trackingNumber}
          </Typography>
        </Typography>
      )}
      <StyledCardFooter>
        <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
          {t('profileOrders.status')}: {orderStatus}
        </Typography>
        <Link to={`${urls.PROFILE}/${urls.PROFILE_ORDERS}/${orderId}`}>
          <StyledButton styles={StyleVariants.TRANSPARENT} type="button">
            {t('profileOrders.seeDetails')}
          </StyledButton>
        </Link>
      </StyledCardFooter>
    </StyledCard>
  );
}

export default OrderCard;
