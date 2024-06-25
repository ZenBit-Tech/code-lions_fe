import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { onboardingSteps, urls, userRoles } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';

function FinishedOnboardingGuard({ element }: { element: ReactElement }) {
  const { isLoggedIn, onboardingStep, role } = useAppSelector(
    (state) => state.user
  );

  if (!isLoggedIn) {
    return <Navigate to={urls.SIGN_IN} replace />;
  }

  if (role === userRoles.VENDOR && onboardingStep > onboardingSteps.ADDRESS) {
    return <Navigate to={urls.HOME} replace />;
  }

  if (onboardingStep >= onboardingSteps.FINISH) {
    return <Navigate to={urls.HOME} replace />;
  }

  return element;
}

export default FinishedOnboardingGuard;
