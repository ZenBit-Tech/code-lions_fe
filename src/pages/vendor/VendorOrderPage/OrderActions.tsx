import { Box } from '@mui/material';

import { orderStatus, userRoles } from 'src/common/constants';

import {
  NewOrderVendorAction,
  SentVendorAction,
  SentBuyerAction,
  ReceivedBuyerAction,
  ReceivedVendorAction,
  SentBackVendorAction,
  SentBackBuyerAction,
  ReturnedAction,
  OverdueBuyerAction,
  OverdueVendorAction,
} from './OrderActionComponents';

interface IOrderActionsProps {
  status: string | undefined;
  orderId: number;
  role: string | null;
  trackingNumber: string;
  onActionClick: (status: string) => void;
  openModal?: () => void;
}

function OrderActions({
  status,
  orderId,
  role,
  trackingNumber,
  onActionClick,
  openModal,
}: IOrderActionsProps) {
  const renderButtons = () => {
    switch (status) {
      case orderStatus.NEW:
        return role === userRoles.VENDOR ? (
          <NewOrderVendorAction
            orderId={orderId}
            trackingNumber={trackingNumber}
            onActionClick={onActionClick}
            openModal={openModal}
          />
        ) : null;

      case orderStatus.SENT:
        return role === userRoles.VENDOR ? (
          <SentVendorAction trackingNumber={trackingNumber} />
        ) : (
          <SentBuyerAction
            trackingNumber={trackingNumber}
            onActionClick={onActionClick}
          />
        );

      case orderStatus.RECEIVED:
        return role === userRoles.BUYER ? (
          <ReceivedBuyerAction
            trackingNumber={trackingNumber}
            onActionClick={onActionClick}
          />
        ) : (
          <ReceivedVendorAction />
        );

      case orderStatus.SENT_BACK:
        return role === userRoles.VENDOR ? (
          <SentBackVendorAction
            trackingNumber={trackingNumber}
            onActionClick={onActionClick}
          />
        ) : (
          <SentBackBuyerAction trackingNumber={trackingNumber} />
        );

      case orderStatus.RETURNED:
        return <ReturnedAction />;

      case orderStatus.OVERDUE:
        return role === userRoles.BUYER ? (
          <OverdueBuyerAction
            trackingNumber={trackingNumber}
            onActionClick={onActionClick}
          />
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
