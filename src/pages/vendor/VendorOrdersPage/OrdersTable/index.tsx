import { useTranslation } from 'react-i18next';

import {
  Box,
  Table,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import { urls } from 'src/common/constants';
import StyledPagination from 'src/pages/admin/StyledPagination';
import { IVendorOrder } from 'src/redux/order/types';

import {
  BodyTableCell,
  Status,
  StyledLink,
  TableBodyStyled,
  TableCellStyled,
  TableHeadStyled,
  TableRowStyled,
} from './styles';

interface IOrdersTable {
  orders: IVendorOrder[];
  pagesCount: number;
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function OrdersTable({ orders, pagesCount, page, handleChange }: IOrdersTable) {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHeadStyled>
          <TableRowStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('vendorDashboard.id')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('vendorDashboard.product')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="left">
              <Typography variant="subtitle1">
                {t('vendorDashboard.price')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('vendorDashboard.status')}
              </Typography>
            </TableCellStyled>
            <TableCellStyled align="center">
              <Typography variant="subtitle1">
                {t('vendorDashboard.action')}
              </Typography>
            </TableCellStyled>
          </TableRowStyled>
        </TableHeadStyled>
        <TableBodyStyled>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <BodyTableCell component="th" scope="row" align="left">
                #{order.orderId}
              </BodyTableCell>
              <BodyTableCell align="left">
                {order.products.map((product) => (
                  <Box display="flex" gap="4px" key={product.id}>
                    <Typography>{product.name || ''}</Typography>
                    <Typography>
                      {t('vendorDashboard.size')} {product.size || ''}
                    </Typography>
                  </Box>
                ))}
              </BodyTableCell>
              <BodyTableCell align="left">${order.price}</BodyTableCell>
              <BodyTableCell align="center">
                <Status label={order.status} status={order.status} />
              </BodyTableCell>
              <BodyTableCell align="center">
                <StyledLink
                  to={`${urls.VENDOR}/${urls.VENDOR_ORDERS}/:${order.id}`}
                >
                  <Typography>{t('vendorDashboard.openOrder')} </Typography>
                </StyledLink>
              </BodyTableCell>
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
      <StyledPagination
        count={pagesCount}
        page={page}
        handleChange={handleChange}
      />
    </TableContainer>
  );
}

export default OrdersTable;
