import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import { pathToPhotos } from 'src/common/constants';

function HomePage() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
      }}
    >
      <img
        src={`${pathToPhotos}/coming-soon.webp`}
        alt={t('examplePageText.homePage')}
      />
    </Box>
  );
}

export default HomePage;
