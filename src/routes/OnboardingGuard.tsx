import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { onboardingSteps, urls } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';

function OnboardingGuard({ element }: { element: ReactElement }) {
  const onboardingStep = useAppSelector((state) => state.user.onboardingStep);

  if (onboardingStep && onboardingStep < onboardingSteps.FINISH) {
    return <Navigate to={urls.ONBOARDING} replace />;
  }

  return element;
}

export default OnboardingGuard;
