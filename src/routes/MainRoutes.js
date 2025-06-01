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

// profile
const MyInfo = Loadable(lazy(() => import('views/pages/Profile/MyInfo')));
const MyAttendances = Loadable(
  lazy(() => import('views/pages/Profile/MyAttendances'))
);

// employee management
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
const EmployeeAttendance = Loadable(
  lazy(() =>
    import(
      'views/pages/Employees/ActiveEmployees/SingleActiveEmployee/EmployeeAttendance'
    )
  )
);
const SalaryRecord = Loadable(
  lazy(() =>
    import(
      'views/pages/Employees/ActiveEmployees/SingleActiveEmployee/SalaryRecord'
    )
  )
);
const ResignedEmployees = Loadable(
  lazy(() => import('views/pages/Employees/ResignedEmployees'))
);
const TransferEmployee = Loadable(
  lazy(() => import('views/pages/Employees/TransferEmployee'))
);

// attendances
const DailyAttendance = Loadable(
  lazy(() => import('views/pages/Attendance/DailyAttendance'))
);
const AllAttendance = Loadable(
  lazy(() => import('views/pages/Attendance/AllAttendance'))
);
const PresentManagement = Loadable(
  lazy(() => import('views/pages/PresentManagement'))
);
const MyLeaves = Loadable(
  lazy(() => import('views/pages/LeaveManagement/MyLeaves'))
);
const PendingLeaves = Loadable(
  lazy(() => import('views/pages/LeaveManagement/PendingLeaves'))
);
const ApprovedLeaves = Loadable(
  lazy(() => import('views/pages/LeaveManagement/ApprovedLeaves'))
);

// salary management
const MonthlySalaries = Loadable(
  lazy(() => import('views/pages/SalaryManagement/MonthlySalaries'))
);
const PresentSalary = Loadable(
  lazy(() => import('views/pages/SalaryManagement/PresentSalary'))
);

// end pages

// libraries
const Designation = Loadable(lazy(() => import('views/Libraries/Designation')));
const Department = Loadable(lazy(() => import('views/Libraries/Department')));
const Area = Loadable(lazy(() => import('views/Libraries/Area')));
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
              path: 'profile',
              children: [
                {
                  path: 'my-info',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin', 'user']}
                      allowedCodes={['my-info']}
                    >
                      <MyInfo />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'my-attendances',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin', 'user']}
                      allowedCodes={['my-attendances']}
                    >
                      <MyAttendances />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'employee-management',
              children: [
                {
                  path: 'employees',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['employees']}
                    >
                      <ActiveEmployees />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'employees/:id',
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
                      path: 'attendance',
                      element: <EmployeeAttendance />,
                    },
                    {
                      path: 'salary',
                      element: <SalaryRecord />,
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
                {
                  path: 'transfer-employees',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['transfer-employees']}
                    >
                      <TransferEmployee />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'attendances',
              children: [
                {
                  path: 'daily-attendance',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['daily-attendance']}
                    >
                      <DailyAttendance />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'all-attendance',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['all-attendance']}
                    >
                      <AllAttendance />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'salary-management',
              children: [
                {
                  path: 'monthly-salaries',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['monthly-salaries']}
                    >
                      <MonthlySalaries />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'present-salary',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['present-salary']}
                    >
                      <PresentSalary />
                    </AuthenticationRoutes>
                  ),
                },
              ],
            },
            {
              path: 'present-management',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin', 'admin']}
                  allowedCodes={['present-management']}
                >
                  <PresentManagement />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'leave-management',
              children: [
                {
                  path: 'my-leaves',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'user']}
                      allowedCodes={['my-leaves']}
                    >
                      <MyLeaves />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'pending-leaves',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['pending-leaves']}
                    >
                      <PendingLeaves />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'approved-leaves',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['approved-leaves']}
                    >
                      <ApprovedLeaves />
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
              path: 'area',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin', 'admin']}
                  allowedCodes={['area']}
                >
                  <Area />
                </AuthenticationRoutes>
              ),
            },
            {
              path: 'branch',
              element: (
                <AuthenticationRoutes
                  allowedRoles={['super_admin', 'admin']}
                  allowedCodes={['branch']}
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
