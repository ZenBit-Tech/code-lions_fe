import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import theme from 'src/theme';
import SimpleSection from 'src/components/shared/SimpleSection';
import SectionTitle from 'src/components/shared/SectionTitle';
import articles from './articles';
import {
  ArticleWrapper,
  Container,
  SectionWrapper,
  TextWrapper,
  TitleStyled,
} from './styles';

function TermsOfUsePage() {
  const { t } = useTranslation();

  return (
    <SimpleSection>
      <Container>
        <SectionTitle
          title={t('termsOfUse.title')}
          greyBackground
          showBackLink
          mt="12px"
        />
        <SectionWrapper>
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
        </SectionWrapper>
      </Container>
    </SimpleSection>
  );
}

export default TermsOfUsePage;
