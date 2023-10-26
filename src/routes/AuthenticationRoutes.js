import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import LoadingPage from 'ui-component/LoadingPage';

const UnAuthorized = Loadable(lazy(() => import('views/UnAuthorized')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = ({ children, allowedRoles, allowedCodes }) => {
  const { data, isLoading } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = data?.data;
  if (isLoading) {
    return <LoadingPage />;
  }
  return allowedRoles.includes(userData?.role) ||
    userData?.menus?.find((code) => allowedCodes.includes(code.label)) ||
    userData?.subMenus?.find((code) => allowedCodes.includes(code.label)) ||
    userData?.sections?.find((code) => allowedCodes.includes(code.label)) ? (
    children
  ) : (
    <UnAuthorized />
  );
};

export default AuthenticationRoutes;
