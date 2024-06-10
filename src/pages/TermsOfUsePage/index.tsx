import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from 'src/components/shared/Title';
import ArrowIcon from 'src/assets/icons/arrow-left.svg';
import { IconButton, Typography } from '@mui/material';
import theme from 'src/theme';
import articles from './articles';
import {
  ArticleWrapper,
  Container,
  SectionWrapper,
  SimpleSection,
  StyledLink,
  TextWrapper,
  TitleStyled,
  TitleWrapper,
} from './styles';

function TermsOfUsePage() {
  const { t } = useTranslation();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <SimpleSection component="section">
      <Container>
        <TitleWrapper>
          <StyledLink to={backLinkHref}>
            <IconButton sx={{ padding: 0 }}>
              <ArrowIcon />
            </IconButton>
          </StyledLink>
          <Title variant="h5" component="h1">
            {t('termsOfUse.title')}
          </Title>
        </TitleWrapper>
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
