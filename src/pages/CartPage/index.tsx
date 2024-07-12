import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { urls } from 'src/common/constants';
import Container from 'src/components/shared/Container';
import SectionTitle from 'src/components/shared/SectionTitle';
import StyledButton from 'src/components/shared/StyledButton';
import { selectCart } from 'src/redux/cart/cartSlice';
import { useAppSelector } from 'src/redux/hooks';

import CartTable from './CartTable';
import TableWrapper from './styles';

function CartPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cartItems = useAppSelector(selectCart);

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      flexDirection="column"
      flex="2"
    >
      <Container>
        <SectionTitle title={t('cartPage.title')} showBackLink mt="12px" />
        <TableWrapper>
          {cartItems && cartItems.length > 0 ? (
            <>
              <CartTable data={cartItems} />
              <StyledButton
                width="489px"
                onClick={() => navigate(`/${urls.CHECKOUT}`)}
              >
                <Typography>{t('cartPage.nextButton')}</Typography>
              </StyledButton>
            </>
          ) : (
            <Typography>{t('cartPage.noOrders')}</Typography>
          )}
        </TableWrapper>
      </Container>
    </Box>
  );
}

export default CartPage;
