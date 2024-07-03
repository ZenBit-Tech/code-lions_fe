import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { onboardingSteps, urls, userRoles } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';

function OnboardingGuard({ element }: { element: ReactElement }) {
  const { isLoggedIn, onboardingStep, role } = useAppSelector(
    (state) => state.user
  );

  if (
    isLoggedIn &&
    (role === userRoles.VENDOR || role === null) &&
    onboardingStep <= onboardingSteps.ADDRESS
  ) {
    return <Navigate to={urls.ONBOARDING} replace />;
  }

  if (
    isLoggedIn &&
    role === userRoles.BUYER &&
    onboardingStep < onboardingSteps.FINISH
  ) {
    return <Navigate to={urls.ONBOARDING} replace />;
  }

  return element;
}

export default OnboardingGuard;
