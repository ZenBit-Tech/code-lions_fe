import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import Container from 'src/components/shared/Container';
import SectionTitle from 'src/components/shared/SectionTitle';
import StyledButton from 'src/components/shared/StyledButton';
import { useGetCartByIdQuery } from 'src/redux/cart/cartService';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserId } from 'src/redux/user/userSlice';

import CartTable from './CartTable';
import TableWrapper from './styles';

function CartPage() {
  const { t } = useTranslation();

  const userId = useAppSelector(selectUserId);
  const { data } = useGetCartByIdQuery({ userId });

  return (
    <Container>
      <SectionTitle title={t('cartPage.title')} showBackLink mt="12px" />
      <TableWrapper>
        {data && data.length > 0 ? (
          <>
            <CartTable data={data} />
            <StyledButton width="489px">
              <Typography>{t('cartPage.nextButton')}</Typography>
            </StyledButton>
          </>
        ) : (
          <Typography>{t('cartPage.noOrders')}</Typography>
        )}
      </TableWrapper>
    </Container>
  );
}

export default CartPage;
