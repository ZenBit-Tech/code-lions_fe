import { useTranslation } from 'react-i18next';

import { Box, Typography, Button } from '@mui/material';

import formatDateString from 'src/common/utils/formatDateString';
import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import { IOrder } from 'src/redux/order/types';
import theme from 'src/theme';

import styles from './styles';

interface IOrderInfoSectionProps {
  order: IOrder;
}

function OrderInfoSection({ order }: IOrderInfoSectionProps) {
  const { t } = useTranslation();

  return (
    <>
      <AdminSectionSubTitle title={t('vendorOrder.orderInfo')} />
      <Box display="flex" justifyContent="space-between" marginTop="24px">
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
          <Box sx={styles.statusWrapper}>
            <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
              {order.status}
            </Typography>
          </Box>
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
      <Box sx={styles.buttonWrapper}>
        <Button sx={styles.rejectButton}>
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
    </>
  );
}

export default OrderInfoSection;
