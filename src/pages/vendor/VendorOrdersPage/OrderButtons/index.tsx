import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import theme from 'src/theme';

import { StyledListItemButton, StyledTypography } from './styles';

function OrdersButtons() {
  const { t } = useTranslation();

  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusClick = (status: string) => {
    setSelectedStatus(status);
  };

  const statuses = {
    NEW: t('vendorOrders.newOrder'),
    SENT: t('vendorOrders.sent'),
    DELIVERED: t('vendorOrders.delivered'),
    RECEIVED: t('vendorOrders.received'),
    WAITING_RETURNING: t('vendorOrders.waiting'),
    RETURNED: t('vendorOrders.returned'),
    REJECTED: t('vendorOrders.rejected'),
  };

  return (
    <Box display="flex" gap="32px">
      {Object.entries(statuses).map(([key, label]) => (
        <StyledListItemButton
          key={key}
          selected={selectedStatus === label}
          onClick={() => handleStatusClick(label)}
        >
          <StyledTypography theme={theme} isActive={selectedStatus === label}>
            {label}
          </StyledTypography>
        </StyledListItemButton>
      ))}
    </Box>
  );
}

export default OrdersButtons;
