import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';

import { pathToPhotos } from 'src/common/constants';
import theme from 'src/theme';

function HomePage() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.secondary.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
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
    </Box>
  );
}

export default HomePage;
