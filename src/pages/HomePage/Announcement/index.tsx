import { useTranslation } from 'react-i18next';

import Container from 'src/components/shared/Container';
import theme from 'src/theme.tsx';

import {
  AnnouncementWrapper,
  AnnouncementTitle,
  AnnouncementSubtitle,
} from './styles';

function Announcement() {
  const { t } = useTranslation();

  return (
    <Container>
      <AnnouncementWrapper theme={theme}>
        <AnnouncementTitle variant="h5" theme={theme}>
          {t('home.announcementTitle')}
        </AnnouncementTitle>
        <AnnouncementSubtitle variant="body1" theme={theme}>
          {t('home.announcementText')}
        </AnnouncementSubtitle>
      </AnnouncementWrapper>
    </Container>
  );
}

export default Announcement;
