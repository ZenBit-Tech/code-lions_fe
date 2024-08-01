import { useTranslation } from 'react-i18next';

import {
  Box,
  Table,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';

import { urls } from 'src/common/constants';
import {
  Status,
  StyledLink,
} from 'src/pages/vendor/VendorOrdersPage/OrdersTable/styles';

import { Order } from '../types';

import {
  BodyTableCell,
  TableBodyStyled,
  TableCellStyled,
  TableHeadStyled,
  TableRowStyled,
} from './styles';

interface IOrdersTable {
  data: Order[];
}

function OrdersTable({ data }: IOrdersTable) {
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
            <TableCellStyled align="left">
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
          {data.map((order) => (
            <TableRow key={order.id}>
              <BodyTableCell component="th" scope="row" align="left">
                #{order.id}
              </BodyTableCell>
              <BodyTableCell align="left">
                {order.items.map((item) => (
                  <Box display="flex" gap="4px" key={item.name}>
                    <Typography>{item.name || ''}</Typography>
                    <Typography>
                      {t('vendorDashboard.size')} {item.size || ''}
                    </Typography>
                  </Box>
                ))}
              </BodyTableCell>
              <BodyTableCell align="left">${order.amount}</BodyTableCell>
              <BodyTableCell align="left">
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
    </TableContainer>
  );
}

export default OrdersTable;
