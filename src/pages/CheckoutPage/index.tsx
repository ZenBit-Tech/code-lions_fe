import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import Container from 'src/components/shared/Container';
import SectionTitle from 'src/components/shared/SectionTitle';
import CartTable from 'src/pages/CartPage/CartTable';
import TableWrapper from 'src/pages/CartPage/styles';
import { selectCart } from 'src/redux/cart/cartSlice';
import { useAppSelector } from 'src/redux/hooks';

import AddressForm from '../ProfilePage/AddressForm';

import CartSummary from './CartSummary';

function CheckoutPage() {
  const { t } = useTranslation();

  const cartItems = useAppSelector(selectCart);

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
          <CartTable data={cartItems} />
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
