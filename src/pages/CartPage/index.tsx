import { useTranslation } from 'react-i18next';

import Container from 'src/components/shared/Container';
import SectionTitle from 'src/components/shared/SectionTitle';

import CartTable from './CartTable';
import { TableWrapper } from './CartTable/styles';

function CartPage() {
  const { t } = useTranslation();

  return (
    <Container>
      <SectionTitle title={t('cartPage.title')} showBackLink mt="12px" />
      <TableWrapper margin="0 166px">
        <CartTable />
      </TableWrapper>

      {/* <SectionWrapper>
          <TextWrapper>
            {articles.map(({ id, title, text }, index) => (
              <ArticleWrapper key={id}>
                <TitleStyled variant="h3" center={index === 0}>
                  {t(title)}
                </TitleStyled>
                <Typography variant="body2" color={theme.palette.text.disabled}>
                  {t(text)}
                </Typography>
              </ArticleWrapper>
            ))}
          </TextWrapper>
        </SectionWrapper> */}
    </Container>
  );
}

export default CartPage;
