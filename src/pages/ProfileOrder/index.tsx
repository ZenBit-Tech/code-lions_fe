import { useParams } from 'react-router-dom';

import { CircularProgress, Grid } from '@mui/material';

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

const mockTrackingNumber: string = 'rghh-g5g6-5678';

function ProfileOrderPage() {
  const { orderId } = useParams<{ orderId: string }>();

  const orderIdNumber: number = Number(orderId);

  const userRole = useAppSelector(selectUserRole);

  const { data, isLoading } = useGetOrderByUserIdAndOrderIdQuery({
    orderId: orderIdNumber,
  });

  const handleActionClick = (action: string): void => {
    console.log(`Action clicked: ${action}`);
  };

  if (!data || isLoading) {
    return <CircularProgress sx={{ color: theme.palette.common.black }} />;
  }

  const order: IOrder = data.order[0];

  return (
    <OrderDetailsSection orderNumber={order.orderId}>
      <Grid container columns={7} sx={{ padding: '12px' }}>
        <Grid item xs={5} sx={{ paddingRight: '24px' }}>
          <OrderInfoSection order={order} />
          <OrderActions
            status={order.status}
            orderId={order.orderId}
            role={userRole}
            trackingNumber={mockTrackingNumber}
            onActionClick={handleActionClick}
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
