// import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/system';

import {
  pathToPhotos /* onboardingSteps,  urls */,
} from 'src/common/constants';
// import { useAppSelector } from 'src/redux/hooks';
// import { selectOnboardingStep } from 'src/redux/user/userSlice';

function HomePage() {
  const { t } = useTranslation();

  /* 
  const navigate = useNavigate();

  const onboardingStep = useAppSelector(selectOnboardingStep);

  useEffect(() => {
    if (onboardingStep && onboardingStep < onboardingSteps.FINISH) {
     navigate(urls.ONBOARDING);
    }
  }, [onboardingStep, navigate]);

  if (onboardingStep && onboardingStep < onboardingSteps.FINISH) {
    return null;
  }
*/
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
