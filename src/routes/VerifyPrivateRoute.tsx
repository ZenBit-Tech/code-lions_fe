import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { urls } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';
import { RootState } from 'src/redux/store';

interface PrivateRouteProps {
  children?: ReactNode;
}

function VerifyPrivateRoute({ children }: PrivateRouteProps) {
  const user = useAppSelector((state: RootState) => state.user.user);

  if (user.isEmailVerified && user.isLoggedIn) {
    return <Navigate to={urls.HOME} />;
  } else if (user.isEmailVerified && !user.isLoggedIn) {
    return <Navigate to={urls.SIGN_IN} />;
  } else {
    return children ? <>{children}</> : <Outlet />;
  }
}

VerifyPrivateRoute.defaultProps = {
  children: null,
};

export default VerifyPrivateRoute;
