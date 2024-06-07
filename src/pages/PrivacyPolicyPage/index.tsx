import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from 'src/components/shared/Container';
import Title from 'src/components/shared/Title';
import ArrowIcon from 'src/assets/icons/arrow-left.svg';
import { IconButton, Typography } from '@mui/material';
import theme from 'src/theme';
import articles from './articles';
import {
  ArticleWrapper,
  SectionWrapper,
  SimpleSection,
  StyledLink,
  TextWrapper,
  TitleWrapper,
} from './styles';

function NewPasswordPage() {
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
          <Title>{t('privacyPolicy.title')}</Title>
        </TitleWrapper>
        <SectionWrapper>
          <TextWrapper>
            {articles.map(({ id, title, text }) => (
              <ArticleWrapper key={id}>
                <Typography variant="h3">{t(title)}</Typography>
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

export default NewPasswordPage;
