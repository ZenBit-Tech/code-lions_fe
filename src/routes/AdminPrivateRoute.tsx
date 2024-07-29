import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { urls, userRoles } from 'src/common/constants';
import { RootState } from 'src/common/types';
import { useAppSelector } from 'src/redux/hooks';

interface AdminPrivateRouteProps {
  children?: ReactNode;
}

function AdminPrivateRoute({ children }: AdminPrivateRouteProps) {
  const user = useAppSelector((state: RootState) => state.user);

  if (user.role === userRoles.ADMIN) {
    return children ? <>{children}</> : <Outlet />;
  } else {
    return <Navigate to={urls.ADMIN_SIGN_IN} />;
  }
}

export default AdminPrivateRoute;
