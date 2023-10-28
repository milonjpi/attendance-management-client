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
const ActiveEmployees = Loadable(
  lazy(() => import('views/pages/Employees/ActiveEmployees'))
);
const SingleActiveEmployee = Loadable(
  lazy(() =>
    import('views/pages/Employees/ActiveEmployees/SingleActiveEmployee')
  )
);
const ActiveEmployeeInfo = Loadable(
  lazy(() =>
    import(
      'views/pages/Employees/ActiveEmployees/SingleActiveEmployee/ActiveEmployeeInfo'
    )
  )
);
const AccessControl = Loadable(
  lazy(() =>
    import(
      'views/pages/Employees/ActiveEmployees/SingleActiveEmployee/AccessControl'
    )
  )
);
const ActiveAccessHistory = Loadable(
  lazy(() =>
    import(
      'views/pages/Employees/ActiveEmployees/SingleActiveEmployee/ActiveAccessHistory'
    )
  )
);
const ResignedEmployees = Loadable(
  lazy(() => import('views/pages/Employees/ResignedEmployees'))
);

// libraries
const Designation = Loadable(lazy(() => import('views/Libraries/Designation')));
const Department = Loadable(lazy(() => import('views/Libraries/Department')));
const LocationPage = Loadable(lazy(() => import('views/Libraries/Location')));
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
              path: 'employees',
              children: [
                {
                  path: 'active-employees',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['active-employees']}
                    >
                      <ActiveEmployees />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'active-employees/:id',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['active-employees']}
                    >
                      <SingleActiveEmployee />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <ActiveEmployeeInfo />,
                    },
                    {
                      path: 'access',
                      element: <AccessControl />,
                    },
                    {
                      path: 'history',
                      element: <ActiveAccessHistory />,
                    },
                  ],
                },
                {
                  path: 'resigned-employees',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['resigned-employees']}
                    >
                      <ResignedEmployees />
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
                  allowedRoles={['super_admin', 'admin']}
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
                  allowedRoles={['super_admin', 'admin']}
                  allowedCodes={['department']}
                >
                  <Department />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'location',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin', 'admin']}
                  allowedCodes={['location']}
                >
                  <LocationPage />
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
                      allowedRoles={['super_admin', 'admin']}
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
                      allowedRoles={['super_admin', 'admin']}
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
