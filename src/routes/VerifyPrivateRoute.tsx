import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { urls } from 'src/common/constants';
import { RootState } from 'src/common/types';
import { useAppSelector } from 'src/redux/hooks';

interface PrivateRouteProps {
  children?: ReactNode;
}

function VerifyPrivateRoute({ children }: PrivateRouteProps) {
  const user = useAppSelector((state: RootState) => state.user);

  if (user.isEmailVerified && user.isLoggedIn) {
    return <Navigate to={urls.HOME} />;
  } else if (user.isEmailVerified && !user.isLoggedIn) {
    return <Navigate to={urls.SIGN_IN} />;
  } else {
    return children ? <>{children}</> : <Outlet />;
  }
}

export default VerifyPrivateRoute;
