import { useTranslation } from 'react-i18next';

import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableContainer,
  TableRow,
} from '@mui/material';

import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import { Image } from 'src/pages/CartPage/CartTable/styles';
import {
  BodyTableCell,
  TableBodyStyled,
} from 'src/pages/vendor/VendorProductsPage/ProductsTable/styles';
import theme from 'src/theme';

import mockOrder from './mockData';
import OrderDetailsSection from './OrderDetailsSection';

function VendorOrderPage() {
  const { t } = useTranslation();

  return (
    <OrderDetailsSection>
      <Grid container columns={7} sx={{ padding: '12px' }}>
        <Grid item xs={5} sx={{ paddingRight: '24px' }}>
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
            sx={{ margin: '8px 0 24px 0' }}
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
          <AdminSectionSubTitle title={t('vendorOrder.products')} />
          <Box marginBottom="16px">
            <TableContainer>
              <Table aria-label="simple table">
                <TableBodyStyled>
                  {mockOrder.products.map((product) => (
                    <TableRow key={product.id}>
                      <BodyTableCell
                        component="th"
                        scope="row"
                        align="left"
                        sx={{ padding: '16px 16px 16px 0', width: '68px' }}
                      >
                        <Image
                          width="52px"
                          height="67px"
                          src={product.url}
                          alt={product.url}
                        />
                      </BodyTableCell>
                      <BodyTableCell
                        component="th"
                        scope="row"
                        align="left"
                        colSpan={3}
                        sx={{ padding: '16px 0' }}
                      >
                        {product.name}
                      </BodyTableCell>
                      <BodyTableCell align="center">
                        {product.price}
                      </BodyTableCell>
                      <BodyTableCell align="center">{1}</BodyTableCell>
                      <BodyTableCell
                        align="right"
                        sx={{ padding: '16px 0 16px 16px' }}
                      >
                        {product.price}
                      </BodyTableCell>
                    </TableRow>
                  ))}
                </TableBodyStyled>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              borderRadius: '8px',
              padding: '12px 24px',
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ marginBottom: '16px' }}
            >
              <Typography variant="h4">{t('vendorOrder.subtotal')}</Typography>
              <Typography variant="h4">{mockOrder.subtotal}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ marginBottom: '16px' }}
            >
              <Typography variant="h4">{t('vendorOrder.discount')}</Typography>
              <Typography variant="h4">{mockOrder.discount}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{ marginBottom: '24px' }}
            >
              <Typography variant="h4">{t('vendorOrder.shipping')}</Typography>
              <Typography variant="h4">{mockOrder.shipping}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4">{t('vendorOrder.total')}</Typography>
              <Typography variant="h4">{mockOrder.totalSum}</Typography>
            </Box>
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
