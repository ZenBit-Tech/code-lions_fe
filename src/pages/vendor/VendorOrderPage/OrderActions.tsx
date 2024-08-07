import { useTranslation } from 'react-i18next';

import { Box, Button, Input } from '@mui/material';

import { orderStatus, userRoles } from 'src/common/constants';

interface IOrderActionsProps {
  status: string | undefined;
  role: string | null;
  trackingNumber: string;
  onActionClick: (action: string) => void;
}

const mockDays: string = '5 days';

function OrderActions({
  status,
  role,
  trackingNumber,
  onActionClick,
}: IOrderActionsProps) {
  const { t } = useTranslation();

  const renderButtons = () => {
    switch (status) {
      case orderStatus.NEW:
        return role === userRoles.VENDOR ? (
          <Box>
            <Input placeholder="Tracking Number" />
            <Button onClick={() => onActionClick('Reject')}>
              {t('vendorOrder.reject')}
            </Button>
            <Button onClick={() => onActionClick('Send')}>
              {t('vendorOrder.send')}
            </Button>
          </Box>
        ) : null;

      case orderStatus.SENT:
        return role === userRoles.VENDOR ? (
          <Box>{`${t('vendorOrder.trackingNumber')} ${trackingNumber}`}</Box>
        ) : (
          <Box>
            {`${t('vendorOrder.trackingNumber')} ${trackingNumber}`}
            <Button onClick={() => onActionClick('Received')}>
              {t('vendorOrder.received')}
            </Button>
          </Box>
        );

      case orderStatus.RECEIVED:
        return role === userRoles.BUYER ? (
          <Box>
            <Box>{mockDays}</Box>
            <Input placeholder="Tracking Number" />
            <Button onClick={() => onActionClick('Return')}>
              {t('vendorOrder.return')}
            </Button>
          </Box>
        ) : (
          <Box>{mockDays}</Box>
        );

      case orderStatus.SENT_BACK:
        return role === userRoles.VENDOR ? (
          <Box>
            {`${t('vendorOrder.trackingNumber')} ${trackingNumber}`}
            <Button onClick={() => onActionClick('Returned')}>
              {t('vendorOrder.returned')}
            </Button>
          </Box>
        ) : (
          <Box>{`${t('vendorOrder.trackingNumber')} ${trackingNumber}`}</Box>
        );

      case orderStatus.RETURNED:
        return (
          <Button onClick={() => onActionClick('Leave Review')}>
            {t('vendorOrder.leaveReview')}
          </Button>
        );

      case orderStatus.OVERDUE:
        return role === userRoles.BUYER ? (
          <Box>
            <Input placeholder="Tracking number" />
            <Button onClick={() => onActionClick('Pay&Send')}>
              {t('vendorOrder.paySend')}
            </Button>
          </Box>
        ) : null;

      default:
        return null;
    }
  };

  return <Box>{renderButtons()}</Box>;
}

export default OrderActions;
