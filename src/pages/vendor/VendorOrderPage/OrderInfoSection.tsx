import { useTranslation } from 'react-i18next';

import { Box, Typography, Button } from '@mui/material';

import { orderStatus } from 'src/common/constants';
import formatDateString from 'src/common/utils/formatDateString';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import { Status } from 'src/pages/vendor/VendorOrdersPage/OrdersTable/styles';
import { useRejectOrderMutation } from 'src/redux/order/orderService';
import { IOrder } from 'src/redux/order/types';
import theme from 'src/theme';

import styles from './styles';

interface IOrderInfoSectionProps {
  order: IOrder;
}

function OrderInfoSection({ order }: IOrderInfoSectionProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [rejectOrder] = useRejectOrderMutation();

  const rejectOrderByVendor = async () => {
    try {
      await rejectOrder({
        orderId: order.orderId,
      }).unwrap();
    } catch {
      showToast('error', t('toasterMessages.failedToRejectOrder'));
    }
  };

  return (
    <>
      <AdminSectionSubTitle title={t('vendorOrder.orderInfo')} />
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ margin: '24px 0 24px 0' }}
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
      {order.status === orderStatus.NEW && (
        <Box sx={styles.buttonWrapper}>
          <Button sx={styles.rejectButton} onClick={rejectOrderByVendor}>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.common.black,
              }}
            >
              {t('vendorOrder.reject')}
            </Typography>
          </Button>
        </Box>
      )}
    </>
  );
}

export default OrderInfoSection;
