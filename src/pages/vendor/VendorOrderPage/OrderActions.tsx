import { Box } from '@mui/material';

import { userRoles } from 'src/common/constants';
import { IOrder, OrderStatus } from 'src/redux/order/types';

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
  hasLeftReview: boolean;
}

function OrderActions({
  status,
  order,
  role,
  hasLeftReview,
}: IOrderActionsProps) {
  const renderButtons = () => {
    switch (status) {
      case OrderStatus.NEW:
        return role === userRoles.VENDOR ? (
          <NewOrderVendorAction order={order} />
        ) : (
          <NewOrderBuyerAction order={order} />
        );

      case OrderStatus.REJECTED:
        return <RejectedAction order={order} />;

      case OrderStatus.SENT:
        return role === userRoles.VENDOR ? (
          <SentVendorAction order={order} />
        ) : (
          <SentBuyerAction order={order} />
        );

      case OrderStatus.RECEIVED:
        return role === userRoles.BUYER ? (
          <ReceivedBuyerAction order={order} />
        ) : (
          <ReceivedVendorAction order={order} />
        );

      case OrderStatus.SENT_BACK:
        return role === userRoles.VENDOR ? (
          <SentBackVendorAction order={order} />
        ) : (
          <SentBackBuyerAction order={order} />
        );

      case OrderStatus.RETURNED:
        return role === userRoles.BUYER ? (
          <ReturnedBuyerAction order={order} hasLeftReview={hasLeftReview} />
        ) : (
          <ReturnedVendorAction order={order} hasLeftReview={hasLeftReview} />
        );

      case OrderStatus.OVERDUE:
        return role === userRoles.BUYER ? (
          <OverdueBuyerAction order={order} />
        ) : (
          <OverdueVendorAction order={order} />
        );

      default:
        return null;
    }
  };

  return <Box>{renderButtons()}</Box>;
}

export default OrderActions;
