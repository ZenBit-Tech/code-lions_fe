import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { onboardingSteps, urls } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';
import { selectOnboardingStep } from 'src/redux/user/userSlice';

function HomePage() {
  const { t } = useTranslation();
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

  return (
    <div>
      {onboardingStep}
      {t('examplePageText.homePage')}
    </div>
  );
}

export default HomePage;
