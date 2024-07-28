import { useTranslation } from 'react-i18next';

import { Box, Table, TableContainer, TableRow } from '@mui/material';

import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import { Image } from 'src/pages/CartPage/CartTable/styles';
import {
  BodyTableCell,
  TableBodyStyled,
} from 'src/pages/vendor/VendorProductsPage/ProductsTable/styles';

import mockOrder from './mockData';

function OrderProductsTable() {
  const { t } = useTranslation();

  return (
    <>
      <AdminSectionSubTitle title={t('vendorOrder.products')} />
      <Box sx={{ margin: '20px 0 16px 0' }}>
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
                  <BodyTableCell align="center">{product.price}</BodyTableCell>
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
    </>
  );
}

export default OrderProductsTable;
