import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { onboardingSteps, urls, userRoles } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';

function VendorGuard({ element }: { element: ReactElement }) {
  const { role, onboardingStep } = useAppSelector((state) => state.user);

  if (role === userRoles.VENDOR && onboardingStep >= onboardingSteps.SIZES) {
    return <Navigate to={`${urls.VENDOR}/${urls.VENDOR_DASHBOARD}`} replace />;
  }

  return element;
}

export default VendorGuard;
