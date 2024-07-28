import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography, Button } from '@mui/material';

import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import theme from 'src/theme';

import mockOrder from './mockData';
import OrderDetailsSection from './OrderDetailsSection';

function VendorOrderPage() {
  const { t } = useTranslation();

  return (
    <OrderDetailsSection sectionHeight="356px">
      <Grid container columns={7} sx={{ padding: '12px' }}>
        <Grid item xs={5} sx={{ padding: '24px 24px 0 0' }}>
          <AdminSectionSubTitle title={t('vendorOrder.orderInfo')} />
          <Box display="flex" justifyContent="space-between">
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
              <Box
                sx={{
                  borderRadius: '20px',
                  padding: '4px 16px',
                  backgroundColor: theme.palette.error.light,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: theme.palette.error.main }}
                >
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
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ margin: '8px 0' }}
          >
            <Button
              sx={{
                borderRadius: '8px',
                padding: '12px 24px',
                backgroundColor: theme.palette.common.white,
                border: `1px solid ${theme.palette.common.black}`,
              }}
            >
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
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" flexDirection="column" sx={{ padding: '0 24px' }}>
            <AdminSectionSubTitle title={`${t('vendorOrder.customer')}`} />
            <AdminSectionSubTitle title={`${t('vendorOrder.address')}`} />
          </Box>
        </Grid>
      </Grid>
    </OrderDetailsSection>
  );
}

export default VendorOrderPage;
