import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { urls, userRoles } from 'src/common/constants';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserRole } from 'src/redux/user/userSlice';

interface IVendorPrivateRouteProps {
  children?: ReactNode;
}

function VendorPrivateRoute({ children }: IVendorPrivateRouteProps) {
  const role = useAppSelector(selectUserRole);

  if (role === userRoles.VENDOR) {
    return <Navigate to={`${urls.VENDOR}/${urls.VENDOR_DASHBOARD}`} />;
  } else {
    return children ? <>{children}</> : <Outlet />;
  }
}

export default VendorPrivateRoute;
