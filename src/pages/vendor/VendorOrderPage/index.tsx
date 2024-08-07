import { useParams } from 'react-router-dom';

import { CircularProgress, Grid } from '@mui/material';

import { useGetOrderByUserIdAndOrderIdQuery } from 'src/redux/order/orderService';
import { IOrder } from 'src/redux/order/types';
import theme from 'src/theme';

import BuyerInfoSection from './BuyerInfoSection';
import OrderDetailsSection from './OrderDetailsSection';
import OrderInfoSection from './OrderInfoSection';
import OrderProductsTable from './OrderProductsTable';
import OrderSummarySection from './OrderSummarySection';

function VendorOrderPage() {
  const { orderId } = useParams<{ orderId: string }>();

  const orderIdNumber: number = Number(orderId);

  const { data, isLoading } = useGetOrderByUserIdAndOrderIdQuery({
    orderId: orderIdNumber,
  });

  if (!data || isLoading) {
    return <CircularProgress sx={{ color: theme.palette.common.black }} />;
  }

  const order: IOrder = data.order[0];

  return (
    <OrderDetailsSection orderNumber={order.orderId}>
      <Grid container columns={7} sx={{ padding: '12px' }}>
        <Grid item xs={5} sx={{ paddingRight: '24px' }}>
          <OrderInfoSection order={order} />
          <OrderProductsTable products={order.products} />
          <OrderSummarySection shipping={order.shipping} price={order.price} />
        </Grid>
        <Grid item xs={2}>
          <BuyerInfoSection
            userName={data.userName}
            userId={data.userId}
            address={data.address}
          />
        </Grid>
      </Grid>
    </OrderDetailsSection>
  );
}

export default VendorOrderPage;
