import { useTranslation } from 'react-i18next';

import { Box, Typography, Button } from '@mui/material';

import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import theme from 'src/theme';

import mockOrder from './mockData';
import styles from './styles';

function OrderInfoSection() {
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
            {mockOrder.date}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
            {t('vendorOrder.items')}
          </Typography>
          <Typography
            sx={{ fontWeight: theme.typography.semiBold }}
          >{`${mockOrder.itemsCount} ${t('vendorOrder.items')}`}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
            {t('vendorOrder.status')}
          </Typography>
          <Box sx={styles.statusWrapper}>
            <Typography variant="h4" sx={{ color: theme.palette.error.main }}>
              {mockOrder.status}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" gap="8px">
          <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
            {t('vendorOrder.total')}
          </Typography>
          <Typography sx={{ fontWeight: theme.typography.semiBold }}>
            {mockOrder.total}
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
