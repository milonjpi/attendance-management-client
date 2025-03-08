import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';

const UnAuthorized = Loadable(lazy(() => import('views/UnAuthorized')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = ({ children, allowedRoles, allowedCodes }) => {
  const userData = useSelector(selectAuth);

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
