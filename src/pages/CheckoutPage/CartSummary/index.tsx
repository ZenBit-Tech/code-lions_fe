import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

import { shippingOption } from 'src/common/constants';
import StyledButton from 'src/components/shared/StyledButton';
import { selectCart } from 'src/redux/cart/cartSlice';
import { useAppSelector } from 'src/redux/hooks';

import { FormWrapper, ShippingOption } from './styles';
import useCartSummary from './useCartSummaryHook';

function CartSummary() {
  const { t } = useTranslation();
  const cartItems = useAppSelector(selectCart);
  const [shipping, setShipping] = useState<string>(shippingOption.FREE);

  const { subtotal, total, numberOfVendors, isLoading, handlePayment } =
    useCartSummary(cartItems, shipping);

  const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShipping((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <FormControl>
        <FormWrapper
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={shipping}
          onChange={handleShippingChange}
        >
          <ShippingOption
            selected={shipping === t('checkoutPage.freeShipping')}
          >
            <FormControlLabel
              value={t('checkoutPage.freeShipping')}
              control={<Radio />}
              label={t('checkoutPage.freeShipping')}
            />
            <Typography>${t('checkoutPage.freePrice')}</Typography>
          </ShippingOption>
          <ShippingOption
            selected={shipping === t('checkoutPage.expressShipping')}
          >
            <FormControlLabel
              value={t('checkoutPage.expressShipping')}
              control={<Radio />}
              label={t('checkoutPage.expressShipping')}
            />
            <Typography>
              {`+$${t('checkoutPage.expressPrice')} x ${numberOfVendors}`}
            </Typography>
          </ShippingOption>
        </FormWrapper>
        <Box
          display="flex"
          justifyContent="space-between"
          pt="13px"
          pb="13px"
          mt="16px"
        >
          <Typography>{t('checkoutPage.subtotal')}</Typography>
          <Typography>${subtotal}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" pt="13px" pb="13px">
          <Typography variant="h6">{t('checkoutPage.totalRenting')}</Typography>
          <Typography variant="h6">${total}</Typography>
        </Box>
        <Box display="flex" justifyContent="center" mt="32px">
          <StyledButton
            width="489px"
            onClick={handlePayment}
            disabled={isLoading}
          >
            <Typography>{t('checkoutPage.payButton')}</Typography>
          </StyledButton>
        </Box>
      </FormControl>
    </>
  );
}

export default CartSummary;
