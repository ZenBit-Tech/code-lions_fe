import { useTranslation } from 'react-i18next';

import {
  Box,
  Table,
  TableContainer,
  TableRow,
  Typography,
  TableCell,
  TableHead,
} from '@mui/material';

// import { urls } from 'src/common/constants';

// import { Order } from '../types';

import data from './data';
import { BodyTableCell, ImageWrapper, TableBodyStyled } from './styles';

// interface IOrdersTable {
//   data: Order[];
// }

function CartTable() {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography variant="subtitle1">
                {t('cartPage.product')}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1">{t('cartPage.color')}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1">
                {t('cartPage.rentDuration')}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1">{t('cartPage.price')}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1">
                {t('cartPage.action')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBodyStyled>
          {data.map((item) => (
            <TableRow key={item.id}>
              <BodyTableCell component="th" scope="row" align="left">
                <Box>
                  <ImageWrapper>
                    <img
                      width="52px"
                      height="67px"
                      src={item.images[0]}
                      alt={item.name}
                    />
                  </ImageWrapper>
                  {/* <Box></Box> */}
                </Box>
              </BodyTableCell>
              {/* <BodyTableCell align="left">
                {order.items.map((item) => (
                  <Box display="flex" gap="4px" key={item.name}>
                    <Typography>{item.name || ''}</Typography>
                    <Typography>
                      {t('vendorDashboard.size')} {item.size || ''}
                    </Typography>
                  </Box>
                ))}
              </BodyTableCell> */}
              <BodyTableCell align="left">${item.price}</BodyTableCell>
              {/* <BodyTableCell align="left">
                <Status label={item.status} status={order.status} />
              </BodyTableCell> */}
              <BodyTableCell align="center">
                {/* <StyledLink
                  to={`${urls.VENDOR}/${urls.VENDOR_ORDERS}/:${item.id}`}
                >
                  <Typography>{t('vendorDashboard.openOrder')} </Typography>
                </StyledLink> */}
              </BodyTableCell>
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
    </TableContainer>
  );
}

export default CartTable;
