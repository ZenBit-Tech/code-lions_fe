import { useTranslation } from 'react-i18next';
import SimpleSection from 'src/components/shared/SimpleSection';
import Container from 'src/components/shared/Container';
import SectionTitle from 'src/components/shared/SectionTitle';
import ProfileMenu from './ProfileMenu';

function ProfilePage() {
  const { t } = useTranslation();

  return (
    <SimpleSection>
      <Container>
        <SectionTitle title={t('profile.title')} />
        <ProfileMenu />
      </Container>
    </SimpleSection>
  );
}

export default ProfilePage;
