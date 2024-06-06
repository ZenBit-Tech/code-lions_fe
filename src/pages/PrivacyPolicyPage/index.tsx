import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from 'src/components/shared/Container';
import Title from 'src/components/shared/Title';
import ArrowIcon from 'src/assets/icons/arrow-left.svg';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ArticleWrapper, SimpleSection, TextWrapper } from './styles';

function NewPasswordPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  return (
    <SimpleSection component="section">
      <Container>
        <Box display="flex">
          <Link to={backLinkHref}>
            <IconButton>
              <ArrowIcon />
            </IconButton>
          </Link>
          <Title>{t('privacyPolicy.title')}</Title>
        </Box>
        <TextWrapper>
          <ArticleWrapper>
            <Typography variant="button">
              {t('privacyPolicy.subtitle')}
            </Typography>
            <Typography variant="subtitle2" color="#6D6B6B">
              {t('privacyPolicy.text')}
            </Typography>
          </ArticleWrapper>
          <ArticleWrapper>
            <Typography variant="button">
              {t('privacyPolicy.subtitle')}
            </Typography>
            <Typography variant="subtitle2" color="#6D6B6B">
              {t('privacyPolicy.text')}
            </Typography>
          </ArticleWrapper>
          <ArticleWrapper>
            <Typography variant="button">
              {t('privacyPolicy.subtitle')}
            </Typography>
            <Typography variant="subtitle2" color="#6D6B6B">
              {t('privacyPolicy.text')}
            </Typography>
          </ArticleWrapper>
        </TextWrapper>
      </Container>
    </SimpleSection>
  );
}

export default NewPasswordPage;
