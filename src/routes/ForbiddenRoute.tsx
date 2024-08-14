import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { RootState } from 'src/common/types';
import { useAppSelector } from 'src/redux/hooks';

interface ForbiddenRouteProps {
  allowedRoles: string[];
  redirectTo: string;
  children: ReactNode;
}

function ForbiddenRoute({
  allowedRoles,
  children,
  redirectTo,
}: ForbiddenRouteProps) {
  const user = useAppSelector((state: RootState) => state.user);

  if (user.role && allowedRoles.includes(user.role)) {
    return children;
  } else {
    return <Navigate to={redirectTo} />;
  }
}

export default ForbiddenRoute;
