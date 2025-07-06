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

// employees libraries
const EmployeeLibrary = Loadable(
  lazy(() => import('views/pages/Employees/EmployeeLibrary'))
);
const Designation = Loadable(
  lazy(() => import('views/pages/Employees/EmployeeLibrary/Designation'))
);
const Department = Loadable(
  lazy(() => import('views/pages/Employees/EmployeeLibrary/Department'))
);
const Area = Loadable(
  lazy(() => import('views/pages/Employees/EmployeeLibrary/Area'))
);
const LocationPage = Loadable(
  lazy(() => import('views/pages/Employees/EmployeeLibrary/Location'))
);

// attendances
const DailyAttendance = Loadable(
  lazy(() => import('views/pages/Attendance/DailyAttendance'))
);
const AllAttendance = Loadable(
  lazy(() => import('views/pages/Attendance/AllAttendance'))
);

// present management
const ManualPresent = Loadable(
  lazy(() => import('views/pages/PresentManagement/ManualPresent'))
);
const PresentNow = Loadable(
  lazy(() => import('views/pages/PresentManagement/PresentNow'))
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

// offices
// conveyances
const MyConveyances = Loadable(
  lazy(() => import('views/offices/Conveyances/MyConveyances'))
);
const PendingConveyances = Loadable(
  lazy(() => import('views/offices/Conveyances/PendingConveyances'))
);
const AllConveyances = Loadable(
  lazy(() => import('views/offices/Conveyances/AllConveyances'))
);
const ConveyanceLibrary = Loadable(
  lazy(() => import('views/offices/Conveyances/ConveyanceLibrary'))
);
const ConveyanceCategory = Loadable(
  lazy(() =>
    import('views/offices/Conveyances/ConveyanceLibrary/ConveyanceCategory')
  )
);
const VehicleType = Loadable(
  lazy(() => import('views/offices/Conveyances/ConveyanceLibrary/VehicleType'))
);

// bills
const MyBills = Loadable(lazy(() => import('views/offices/Bills/MyBills')));
const PendingBills = Loadable(
  lazy(() => import('views/offices/Bills/PendingBills'))
);
const AllBills = Loadable(lazy(() => import('views/offices/Bills/AllBills')));
const BillLibrary = Loadable(
  lazy(() => import('views/offices/Bills/BillLibrary'))
);
const BillCategory = Loadable(
  lazy(() => import('views/offices/Bills/BillLibrary/BillCategory'))
);
const Shops = Loadable(
  lazy(() => import('views/offices/Bills/BillLibrary/Shops'))
);
const BillUom = Loadable(
  lazy(() => import('views/offices/Bills/BillLibrary/BillUom'))
);
// end offices

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
                {
                  path: 'employee-library',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['employee-library']}
                    >
                      <EmployeeLibrary />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: 'designation',
                      element: <Designation />,
                    },
                    {
                      path: 'department',
                      element: <Department />,
                    },
                    {
                      path: 'area',
                      element: <Area />,
                    },
                    {
                      path: 'branch',
                      element: <LocationPage />,
                    },
                  ],
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
              children: [
                {
                  path: 'geo-attendance',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['user']}
                      allowedCodes={['geo-attendance']}
                    >
                      <PresentNow />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'manual-present',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['manual-present']}
                    >
                      <ManualPresent />
                    </AuthenticationRoutes>
                  ),
                },
              ],
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
          path: 'offices',
          children: [
            {
              path: 'conveyances',
              children: [
                {
                  path: 'my-conveyances',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['user']}
                      allowedCodes={['my-conveyances']}
                    >
                      <MyConveyances />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'pending-conveyances',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['pending-conveyances']}
                    >
                      <PendingConveyances />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'all-conveyances',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['all-conveyances']}
                    >
                      <AllConveyances />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'conveyance-library',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin', 'user']}
                      allowedCodes={['conveyance-library']}
                    >
                      <ConveyanceLibrary />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <ConveyanceCategory />,
                    },
                    {
                      path: 'vehicle-type',
                      element: <VehicleType />,
                    },
                  ],
                },
              ],
            },
            {
              path: 'bills',
              children: [
                {
                  path: 'my-bills',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['user']}
                      allowedCodes={['my-bills']}
                    >
                      <MyBills />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'pending-bills',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['pending-bills']}
                    >
                      <PendingBills />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'all-bills',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin']}
                      allowedCodes={['all-bills']}
                    >
                      <AllBills />
                    </AuthenticationRoutes>
                  ),
                },
                {
                  path: 'bill-library',
                  element: (
                    <AuthenticationRoutes
                      allowedRoles={['super_admin', 'admin', 'user']}
                      allowedCodes={['bill-library']}
                    >
                      <BillLibrary />
                    </AuthenticationRoutes>
                  ),
                  children: [
                    {
                      path: '',
                      element: <BillCategory />,
                    },
                    {
                      path: 'supplier',
                      element: <Shops />,
                    },
                    {
                      path: 'uom',
                      element: <BillUom />,
                    },
                  ],
                },
              ],
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
