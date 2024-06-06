import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from 'src/redux/store';
import { useAppSelector } from 'src/redux/hooks';
import { urls } from 'src/common/constants';

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

export default VerifyPrivateRoute;
