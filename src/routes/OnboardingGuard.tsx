import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { onboardingSteps, urls } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';

function OnboardingGuard({ element }: { element: ReactElement }) {
  const user = useAppSelector((state) => state.user);

  const { isLoggedIn, isEmailVerified, onboardingStep } = user;

  if (isLoggedIn && isEmailVerified === false) {
    return <Navigate to={urls.VERIFY} replace />;
  }

  if (isLoggedIn && onboardingStep < onboardingSteps.FINISH) {
    return <Navigate to={urls.ONBOARDING} replace />;
  }

  return element;
}

export default OnboardingGuard;
