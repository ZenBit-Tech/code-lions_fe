import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CircularProgress, Grid, Typography } from '@mui/material';

import OrderActions from 'src/pages/vendor/VendorOrderPage/OrderActions';
import { useAppSelector } from 'src/redux/hooks';
import { useGetOrderByUserIdAndOrderIdQuery } from 'src/redux/order/orderService';
import { IOrder } from 'src/redux/order/types';
import { selectUserRole } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import OrderDetailsSection from './OrderDetailsSection';
import OrderInfoSection from './OrderInfoSection';
import OrderProductsTable from './OrderProductsTable';
import OrderSummarySection from './OrderSummarySection';
import VendorInfoSection from './VendorInfoSection';

function ProfileOrderPage() {
  const { t } = useTranslation();

  const { orderId } = useParams<{ orderId: string }>();

  const orderIdNumber: number = Number(orderId);

  const userRole = useAppSelector(selectUserRole);

  const { data, isLoading } = useGetOrderByUserIdAndOrderIdQuery({
    orderId: orderIdNumber,
  });

  if (isLoading) {
    return <CircularProgress sx={{ color: theme.palette.common.black }} />;
  }

  if (!data) {
    return (
      <Typography
        variant="h4"
        sx={{ mt: 4, fontSize: theme.typography.h5.fontSize }}
      >
        {t('profileOrders.orderNotFound')}
      </Typography>
    );
  }

  const order: IOrder = data.order[0];
  const { hasLeftReview } = data;

  return (
    <OrderDetailsSection orderNumber={order.orderId}>
      <Grid container columns={7} sx={{ padding: '12px' }}>
        <Grid item xs={5} sx={{ paddingRight: '24px' }}>
          <OrderInfoSection order={order} />
          <OrderActions
            status={order.status}
            order={order}
            role={userRole}
            hasLeftReview={hasLeftReview}
          />
          <OrderProductsTable products={order.products} />
          <OrderSummarySection shipping={order.shipping} price={order.price} />
        </Grid>
        <Grid item xs={2}>
          <VendorInfoSection
            userName={data.userName}
            userId={data.userId}
            address={data.address}
          />
        </Grid>
      </Grid>
    </OrderDetailsSection>
  );
}

export default ProfileOrderPage;
