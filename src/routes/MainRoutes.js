import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthenticationRoutes from './AuthenticationRoutes';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// pages routing
const StartScan = Loadable(lazy(() => import('views/pages/StartScan')));
const NewGuestParking = Loadable(
  lazy(() => import('views/pages/GuestParking/NewGuestParking'))
);
const GuestInStand = Loadable(
  lazy(() => import('views/pages/GuestParking/GuestInStand'))
);
const GuestList = Loadable(
  lazy(() => import('views/pages/GuestParking/GuestList'))
);
const GuestCard = Loadable(
  lazy(() => import('views/pages/GuestParking/GuestCard'))
);
const Bikers = Loadable(lazy(() => import('views/pages/Bikers/AllBikers')));
const Guards = Loadable(lazy(() => import('views/pages/Guards')));
const InStandReport = Loadable(
  lazy(() => import('views/pages/Report/InStandReport'))
);
const AllStandReport = Loadable(
  lazy(() => import('views/pages/Report/AllStandReport'))
);
const InStandBikers = Loadable(
  lazy(() => import('views/pages/Bikers/InStandBikers'))
);

// libraries
const Designation = Loadable(lazy(() => import('views/Libraries/Designation')));
const Department = Loadable(lazy(() => import('views/Libraries/Department')));
const Brand = Loadable(lazy(() => import('views/Libraries/Brand')));
const Model = Loadable(lazy(() => import('views/Libraries/Model')));
const EngineCC = Loadable(lazy(() => import('views/Libraries/EngineCC')));

// utilities routing

// setting routing
const ManageUser = Loadable(lazy(() => import('views/setting/ManageUser')));
const SingleUser = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser'))
);
const UserInfo = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser/UserInfo'))
);
const UserPermission = Loadable(
  lazy(() => import('views/setting/ManageUser/SingleUser/UserPermission'))
);

// support routing
const Support = Loadable(lazy(() => import('views/support')));

// Support error routing
const Error404 = Loadable(lazy(() => import('views/Error404')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <PrivateRoute />,
  children: [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="dashboard" replace={true} />,
        },
        {
          path: 'dashboard',
          element: <Navigate to="default" replace={true} />,
        },
        {
          path: 'dashboard/default',
          element: <DashboardDefault />,
        },
        {
          path: 'pages',
          children: [
            {
              path: 'start',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['start']}
                >
                  <StartScan />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'guest-parking',
              children: [
                {
                  path: 'guest-parking-operation',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['guest-parking-operation']}
                    >
                      <NewGuestParking />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'guest-in-stand',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['guest-in-stand']}
                    >
                      <GuestInStand />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'guest-list',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['guest-list']}
                    >
                      <GuestList />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'guest-card',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['guest-card']}
                    >
                      <GuestCard />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'bikers',
              children: [
                {
                  path: 'all-bikers',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['all-bikers']}
                    >
                      <Bikers />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'in-stand',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['in-stand']}
                    >
                      <InStandBikers />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'guards',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['guards']}
                >
                  <Guards />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'report',
              children: [
                {
                  path: 'in-stand-report',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['in-stand-report']}
                    >
                      <InStandReport />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'all-stand-report',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['all-stand-report']}
                    >
                      <AllStandReport />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: 'libraries',
          children: [
            {
              path: 'designation',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['designation']}
                >
                  <Designation />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'department',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['department']}
                >
                  <Department />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'brand',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['brand']}
                >
                  <Brand />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'model',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['model']}
                >
                  <Model />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'cc',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin']}
                  allowedCodes={['cc']}
                >
                  <EngineCC />
                </AuthenticationRoutes>
              ),
            },
          ],
        },
        {
          path: 'utils',
          children: [
            {
              path: 'setting',
              children: [
                {
                  path: 'manage-user',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['manage-user']}
                    >
                      <ManageUser />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'manage-user/:id',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin']}
                      allowedCodes={['manage-user']}
                    >
                      <SingleUser />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <UserInfo />,
                    },
                    {
                      path: 'permission',
                      element: <UserPermission />,
                    },
                  ],
                },
              ],
            },
            {
              path: 'support',
              element: <Support />,
            },
          ],
        },
        {
          path: '/*',
          element: <Error404 />,
        },
      ],
    },
  ],
};

export default MainRoutes;
