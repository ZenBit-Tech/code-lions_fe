import { useTranslation } from 'react-i18next';

import {
  Box,
  Table,
  TableContainer,
  TableRow,
  Typography,
  TableCell,
  TableHead,
  IconButton,
  Chip,
} from '@mui/material';

import TrashIcon from 'src/assets/icons/trash-bin.svg';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  BodyTableCell,
  ImageWrapper,
  TableBodyStyled,
  Image,
  Circle,
} from 'src/pages/CartPage/CartTable/styles';
import { useRemoveFromCartMutation } from 'src/redux/cart/cartService';
import { ICartItem } from 'src/redux/cart/types';
import theme from 'src/theme';

interface ICheckoutTableProps {
  data: [string, ICartItem[]];
}

function CheckoutTable({ data }: ICheckoutTableProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { handleOnSubmitError } = useErrorHandling();
  const [removeFromCart] = useRemoveFromCartMutation();

  const [vendorName, items] = data;

  const handleRemove = async (userId: string, productId: string) => {
    try {
      await removeFromCart({ userId, productId }).unwrap();
    } catch (err) {
      handleOnSubmitError(err, showToast, t('profileDetails.unknownError'));
    }
  };

  return (
    <TableContainer>
      <Chip
        variant="outlined"
        label={`${t('checkoutPage.vendor')}: ${vendorName}`}
      />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography variant="button" component="p">
                {t('cartPage.product')}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="button" component="p">
                {t('cartPage.color')}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="button" component="p">
                {t('cartPage.rentDuration')}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="button" component="p">
                {t('cartPage.price')}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="button" component="p">
                {t('cartPage.action')}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBodyStyled>
          {items.map((item) => (
            <TableRow key={item.id}>
              <BodyTableCell component="th" scope="row" align="left">
                <Box display="flex" gap="16px">
                  <ImageWrapper>
                    <Image
                      width="52px"
                      height="67px"
                      src={item.productUrl}
                      alt={item.productUrl}
                    />
                  </ImageWrapper>
                  <Box width="223px">
                    <Typography variant="button" component="p">
                      {item.name || ''}
                    </Typography>
                    <Box display="flex" gap="3px">
                      <Typography
                        variant="h4"
                        component="p"
                        sx={{
                          color: theme.palette.text.disabled,
                          fontWeight: theme.typography.fontWeightBold,
                        }}
                      >
                        {t('cartPage.size')}
                      </Typography>
                      <Typography
                        variant="h4"
                        component="p"
                        sx={{ fontWeight: theme.typography.fontWeightBold }}
                      >
                        {item.size}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </BodyTableCell>
              <BodyTableCell align="center">
                <Box display="flex" gap="4px" justifyContent="center">
                  <Typography
                    variant="h4"
                    component="p"
                    sx={{
                      color: theme.palette.text.disabled,
                      fontWeight: theme.typography.fontWeightBold,
                    }}
                  >
                    {t('cartPage.colorDisplay')}
                  </Typography>
                  <Circle color={item.color} />
                </Box>
              </BodyTableCell>
              <BodyTableCell align="center">
                <Typography>
                  {item.duration}
                  {t('cartPage.days')}
                </Typography>
              </BodyTableCell>
              <BodyTableCell align="center">${item.price}</BodyTableCell>
              <BodyTableCell align="center">
                <IconButton
                  onClick={() => handleRemove(item.userId, item.productId)}
                >
                  <TrashIcon />
                </IconButton>
              </BodyTableCell>
            </TableRow>
          ))}
        </TableBodyStyled>
      </Table>
    </TableContainer>
  );
}

export default CheckoutTable;
