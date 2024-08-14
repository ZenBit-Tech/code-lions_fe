import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import formatDateString from 'src/common/utils/formatDateString';
import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import { Status } from 'src/pages/vendor/VendorOrdersPage/OrdersTable/styles';
import { IOrder } from 'src/redux/order/types';
import theme from 'src/theme';

interface IOrderInfoSectionProps {
  order: IOrder;
}

function OrderInfoSection({ order }: IOrderInfoSectionProps) {
  const { t } = useTranslation();

  return (
    <>
      <AdminSectionSubTitle title={t('vendorOrder.orderInfo')} />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ margin: '24px 0' }}
      >
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
            {t('vendorOrder.date')}
          </Typography>
          <Typography sx={{ fontWeight: theme.typography.semiBold }}>
            {formatDateString(order.createdAt)}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
            {t('vendorOrder.items')}
          </Typography>
          <Typography
            sx={{ fontWeight: theme.typography.semiBold }}
          >{`${order.products.length} ${t('vendorOrder.items')}`}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
            {t('vendorOrder.status')}
          </Typography>
          <Status label={order.status} status={order.status} />
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
            {t('vendorOrder.total')}
          </Typography>
          <Typography sx={{ fontWeight: theme.typography.semiBold }}>
            {`$${order.price}`}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default OrderInfoSection;
