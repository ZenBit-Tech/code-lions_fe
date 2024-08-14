import { Box } from '@mui/material';

import { orderStatus, userRoles } from 'src/common/constants';
import { IOrder } from 'src/redux/order/types';

import {
  NewOrderVendorAction,
  NewOrderBuyerAction,
  SentVendorAction,
  SentBuyerAction,
  ReceivedBuyerAction,
  ReceivedVendorAction,
  SentBackVendorAction,
  SentBackBuyerAction,
  ReturnedBuyerAction,
  ReturnedVendorAction,
  OverdueBuyerAction,
  OverdueVendorAction,
  RejectedAction,
} from './OrderActionComponents';

interface IOrderActionsProps {
  status: string | undefined;
  order: IOrder;
  role: string | null;
}

function OrderActions({ status, order, role }: IOrderActionsProps) {
  const renderButtons = () => {
    switch (status) {
      case orderStatus.NEW:
        return role === userRoles.VENDOR ? (
          <NewOrderVendorAction orderId={order.orderId} />
        ) : (
          <NewOrderBuyerAction orderId={order.orderId} />
        );

      case orderStatus.REJECTED:
        return <RejectedAction order={order} />;

      case orderStatus.SENT:
        return role === userRoles.VENDOR ? (
          <SentVendorAction order={order} />
        ) : (
          <SentBuyerAction order={order} />
        );

      case orderStatus.RECEIVED:
        return role === userRoles.BUYER ? (
          <ReceivedBuyerAction order={order} />
        ) : (
          <ReceivedVendorAction />
        );

      case orderStatus.SENT_BACK:
        return role === userRoles.VENDOR ? (
          <SentBackVendorAction order={order} />
        ) : (
          <SentBackBuyerAction order={order} />
        );

      case orderStatus.RETURNED:
        return role === userRoles.BUYER ? (
          <ReturnedBuyerAction order={order} />
        ) : (
          <ReturnedVendorAction order={order} />
        );

      case orderStatus.OVERDUE:
        return role === userRoles.BUYER ? (
          <OverdueBuyerAction order={order} />
        ) : (
          <OverdueVendorAction />
        );

      default:
        return null;
    }
  };

  return <Box>{renderButtons()}</Box>;
}

export default OrderActions;
