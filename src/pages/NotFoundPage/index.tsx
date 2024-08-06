import { useTranslation, Trans } from 'react-i18next';

import SectionTitle from 'src/components/shared/SectionTitle';

import {
  StyledTypography,
  StyledLink,
  SectionWrapper,
  TextWrapper,
  Container,
  ArticleWrapper,
} from './styles';

function NotFoundPage() {
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL;
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
            <StyledTypography>
              {t('notFound.pageMovedOrDeleted')}
            </StyledTypography>
            <StyledTypography>{t('notFound.optionsToHelp')}</StyledTypography>
            <StyledTypography>{t('notFound.firstOption')}</StyledTypography>
            <StyledTypography>{t('notFound.secondOption')}</StyledTypography>
            <StyledTypography>
              <Trans
                i18nKey="notFound.contactEmail"
                components={{
                  supportEmailLink: (
                    <StyledLink href={`mailto:${supportEmail}`} />
                  ),
                  supportEmail,
                }}
              />
            </StyledTypography>
          </ArticleWrapper>
        </TextWrapper>
      </SectionWrapper>
    </Container>
  );
}

export default NotFoundPage;
