import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import { urls } from 'src/common/constants';
import Container from 'src/components/shared/Container';
import SectionTitle from 'src/components/shared/SectionTitle';
import TableWrapper from 'src/pages/CartPage/styles';
import AddressForm from 'src/pages/ProfilePage/AddressForm';
import { selectCart } from 'src/redux/cart/cartSlice';
import { ICartItem } from 'src/redux/cart/types';
import { useAppSelector } from 'src/redux/hooks';

import CartSummary from './CartSummary';
import CheckoutTable from './CheckoutTable';
import useGroupedByVendor from './useGroupedByVendorHook';

export interface IGroupedByVendor {
  [vendorId: string]: ICartItem[];
}

function CheckoutPage() {
  const { t } = useTranslation();

  const cartItems = useAppSelector(selectCart);
  const navigate = useNavigate();

  const groupedEntries = useGroupedByVendor(cartItems);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate(`/${urls.CART}`);
    }
  }, [cartItems, navigate]);

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      flexDirection="column"
      flex="2"
    >
      <Container>
        <SectionTitle title={t('checkoutPage.title')} showBackLink mt="12px" />
        <TableWrapper>
          {groupedEntries.map(([vendorId, items]) => (
            <CheckoutTable key={vendorId} data={[vendorId, items]} />
          ))}
        </TableWrapper>
        <Box
          display="flex"
          flexDirection="column"
          margin="0 166px 110px 166px"
          gap="110px"
        >
          <Box>
            <AddressForm />
          </Box>
          <CartSummary />
        </Box>
      </Container>
    </Box>
  );
}

export default CheckoutPage;
