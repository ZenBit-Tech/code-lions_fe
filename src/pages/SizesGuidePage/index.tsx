import { useTranslation } from 'react-i18next';
import Title from 'src/components/shared/Title';
// import theme from 'src/theme';

import { TitleWrapper } from 'src/pages/TermsOfUsePage/styles';

import InfoTable from 'src/components/shared/InfoTable';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import { clothesSizeData, shoeSizeData } from './tableData';
import {
  StyledHeader3,
  Container,
  SectionWrapper,
  SimpleSection,
} from './styles';

function SizesGuidePage() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <TitleWrapper>
        <Title variant="h5" component="h1">
          {t('sizesGuide.title')}
        </Title>
      </TitleWrapper>
      <SimpleSection component="section">
        <Container>
          <SectionWrapper>
            <StyledHeader3>{t('sizesGuide.clothesSizeTable')}</StyledHeader3>
            <InfoTable
              tableData={clothesSizeData}
              lastLine={t('sizesGuide.oneSize')}
            />
            <StyledHeader3>{t('sizesGuide.shoeSizeTable')}</StyledHeader3>
            <InfoTable tableData={shoeSizeData} />
            <StyledHeader3>{t('sizesGuide.shoeSizeTable')}</StyledHeader3>
            <InfoTable tableData={shoeSizeData} />
          </SectionWrapper>
        </Container>
      </SimpleSection>
      <Footer />
    </>
  );
}

export default SizesGuidePage;
