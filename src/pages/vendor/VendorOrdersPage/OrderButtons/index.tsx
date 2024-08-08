import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import { OrderStatus } from 'src/redux/order/types';
import theme from 'src/theme';

import { StyledListItemButton, StyledTypography } from './styles';

interface IOrdersButtonsProps {
  status: OrderStatus;
  changeStatus: (value: OrderStatus) => void;
}

function OrdersButtons({ status, changeStatus }: IOrdersButtonsProps) {
  const { t } = useTranslation();

  const statuses = {
    NEW_ORDER: t('vendorOrders.newOrder'),
    REJECTED: t('vendorOrders.rejected'),
    SENT: t('vendorOrders.sent'),
    DELIVERED: t('vendorOrders.delivered'),
    RECEIVED: t('vendorOrders.received'),
    SENT_BACK: t('vendorOrders.sentBack'),
    OVERDUE: t('vendorOrders.overdue'),
    RETURNED: t('vendorOrders.returned'),
  };

  return (
    <Box display="flex" gap="32px">
      {Object.entries(statuses).map(([key, label]) => (
        <StyledListItemButton
          key={key}
          selected={status === label}
          onClick={() => changeStatus(label as OrderStatus)}
        >
          <StyledTypography theme={theme} isActive={status === label}>
            {label}
          </StyledTypography>
        </StyledListItemButton>
      ))}
    </Box>
  );
}

export default OrdersButtons;
