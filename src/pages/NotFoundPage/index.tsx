import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';

import { urls } from 'src/common/constants';
import SectionTitle from 'src/components/shared/SectionTitle';
import {
  ArticleWrapper,
  Container,
  SectionWrapper,
  TextWrapper,
} from 'src/pages/PrivacyPolicyPage/styles';
import theme from 'src/theme';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Container>
      <SectionTitle
        title={t('notFound.title')}
        greyBackground
        showBackLink
        mt="12px"
      />
      <SectionWrapper>
        <TextWrapper>
          <ArticleWrapper>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
              }}
              color={theme.palette.primary.main}
            >
              <Link to={urls.HOME}>{t('notFound.back')}</Link>
            </Typography>
          </ArticleWrapper>
        </TextWrapper>
      </SectionWrapper>
    </Container>
  );
}

export default NotFoundPage;
