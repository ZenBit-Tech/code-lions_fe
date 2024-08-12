import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams } from 'react-router-dom';

import { CircularProgress, Grid } from '@mui/material';

import { orderStatus } from 'src/common/constants';
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import { useAppSelector } from 'src/redux/hooks';
import { useGetOrderByUserIdAndOrderIdQuery } from 'src/redux/order/orderService';
import { IOrder } from 'src/redux/order/types';
import { selectUserRole } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import BuyerInfoSection from './BuyerInfoSection';
import OrderActions from './OrderActions';
import OrderDetailsSection from './OrderDetailsSection';
import OrderInfoSection from './OrderInfoSection';
import OrderProductsTable from './OrderProductsTable';
import OrderSummarySection from './OrderSummarySection';
import RejectOrderModal from './RejectOrderModal';

const mockTrackingNumber: string = 'rghh-g5g6-5678';

function VendorOrderPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const userRole = useAppSelector(selectUserRole);

  const orderIdNumber: number = Number(orderId);

  const [fakeStatus, setFakeStatus] = useState<string>(orderStatus.NEW);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, isLoading } = useGetOrderByUserIdAndOrderIdQuery({
    orderId: orderIdNumber,
  });

  const handleModalOpen = useCallback(() => setShowModal(true), []);
  const handleModalClose = useCallback(() => setShowModal(false), []);

  const handleActionClick = (status: string): void => {
    setFakeStatus(status);
  };

  if (!data || isLoading) {
    return <CircularProgress sx={{ color: theme.palette.common.black }} />;
  }

  const order: IOrder = data.order[0];

  return (
    <OrderDetailsSection orderNumber={order.orderId}>
      {showModal &&
        createPortal(
          <StyledBackdrop showModal={showModal}>
            <RejectOrderModal onClose={handleModalClose} />
          </StyledBackdrop>,
          document.body
        )}
      <Grid container columns={7} sx={{ padding: '12px' }}>
        <Grid item xs={5} sx={{ paddingRight: '24px' }}>
          <OrderInfoSection order={order} fakeStatus={fakeStatus} />
          <OrderActions
            status={fakeStatus}
            orderId={order.orderId}
            role={userRole}
            trackingNumber={mockTrackingNumber}
            onActionClick={handleActionClick}
            openModal={handleModalOpen}
          />
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
