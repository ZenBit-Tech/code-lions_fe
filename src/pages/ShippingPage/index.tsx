import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import SectionTitle from 'src/components/shared/SectionTitle';
import SimpleSection from 'src/components/shared/SimpleSection';
import {
  ArticleWrapper,
  Container,
  SectionWrapper,
  TextWrapper,
  TitleStyled,
} from 'src/pages/PrivacyPolicyPage/styles';
import theme from 'src/theme';

function ShippingPage() {
  const { t } = useTranslation();

  return (
    <SimpleSection>
      <Container>
        <SectionTitle
          title={t('shipping.title')}
          greyBackground
          showBackLink
          mt="12px"
        />
        <SectionWrapper>
          <TextWrapper>
            <ArticleWrapper>
              <TitleStyled variant="h3" center>
                {t('shipping.subtitle')}
              </TitleStyled>
              <Typography variant="body2" color={theme.palette.text.disabled}>
                {t('shipping.text')}
              </Typography>
            </ArticleWrapper>
          </TextWrapper>
        </SectionWrapper>
      </Container>
    </SimpleSection>
  );
}

export default ShippingPage;
