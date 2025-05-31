// assets
import {
  IconBarcode,
  IconBike,
  IconParking,
  IconShieldCheckeredFilled,
  IconChartHistogram,
  IconUsersGroup,
  IconClock,
  IconCalendarStats,
  IconCalendarX,
  IconCoin,
} from '@tabler/icons-react';

// constant
const icons = {
  IconBarcode,
  IconBike,
  IconParking,
  IconShieldCheckeredFilled,
  IconChartHistogram,
  IconUsersGroup,
  IconClock,
  IconCalendarStats,
  IconCalendarX,
  IconCoin,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'employee-management',
      title: 'Employees',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconUsersGroup,
      children: [
        {
          id: 'employees',
          title: 'Active Employees',
          type: 'item',
          url: '/pages/employee-management/employees',
        },
        {
          id: 'resigned-employees',
          title: 'Resigned Employees',
          type: 'item',
          url: '/pages/employee-management/resigned-employees',
        },
        {
          id: 'transfer-employees',
          title: 'Transfer Employees',
          type: 'item',
          url: '/pages/employee-management/transfer-employees',
        },
      ],
    },
    {
      id: 'attendances',
      title: 'Attendances',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconClock,
      children: [
        {
          id: 'daily-attendance',
          title: 'Daily Attendance',
          type: 'item',
          url: '/pages/attendances/daily-attendance',
        },
        {
          id: 'all-attendance',
          title: 'All Attendance',
          type: 'item',
          url: '/pages/attendances/all-attendance',
        },
      ],
    },
    {
      id: 'salary-management',
      title: 'Salary Management',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconCoin,
      children: [
        {
          id: 'monthly-salaries',
          title: 'Monthly Salaries',
          type: 'item',
          url: '/pages/salary-management/monthly-salaries',
        },
      ],
    },
    {
      id: 'present-management',
      title: 'Present Management',
      type: 'item',
      color: '#0C356A',
      icon: icons.IconCalendarStats,
      url: '/pages/present-management',
    },
    {
      id: 'leave-management',
      title: 'Leave Management',
      type: 'collapse',
      color: '#C70039',
      icon: icons.IconCalendarX,
      children: [
        {
          id: 'my-leaves',
          title: 'My Leaves',
          type: 'item',
          url: '/pages/leave-management/my-leaves',
        },
        {
          id: 'pending-leaves',
          title: 'Pending Leaves',
          type: 'item',
          url: '/pages/leave-management/pending-leaves',
        },
        {
          id: 'approved-leaves',
          title: 'Approved Leaves',
          type: 'item',
          url: '/pages/leave-management/approved-leaves',
        },
      ],
    },
  ],
};

export default pages;
