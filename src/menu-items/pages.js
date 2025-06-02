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
  IconUser,
} from '@tabler/icons-react';

// constant
const icons = {
  IconUser,
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
  access: ['super_admin', 'admin', 'user'],
  children: [
    {
      id: 'profile',
      title: 'Profile',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconUser,
      url: '/pages/profile',
      access: ['user'],
      children: [
        {
          id: 'my-info',
          title: 'My Info',
          type: 'item',
          url: '/pages/profile/my-info',
          access: ['user'],
        },
        {
          id: 'my-attendances',
          title: 'My Attendances',
          type: 'item',
          url: '/pages/profile/my-attendances',
          access: ['user'],
        },
      ],
    },
    {
      id: 'employee-management',
      title: 'Employees',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconUsersGroup,
      access: ['super_admin', 'admin'],
      children: [
        {
          id: 'employees',
          title: 'Active Employees',
          type: 'item',
          url: '/pages/employee-management/employees',
          access: ['super_admin', 'admin'],
        },
        {
          id: 'resigned-employees',
          title: 'Resigned Employees',
          type: 'item',
          url: '/pages/employee-management/resigned-employees',
          access: ['super_admin', 'admin'],
        },
        {
          id: 'transfer-employees',
          title: 'Transfer Employees',
          type: 'item',
          url: '/pages/employee-management/transfer-employees',
          access: ['super_admin', 'admin'],
        },
      ],
    },
    {
      id: 'attendances',
      title: 'Attendances',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconClock,
      access: ['super_admin', 'admin'],
      children: [
        {
          id: 'daily-attendance',
          title: 'Daily Attendance',
          type: 'item',
          url: '/pages/attendances/daily-attendance',
          access: ['super_admin', 'admin'],
        },
        {
          id: 'all-attendance',
          title: 'All Attendance',
          type: 'item',
          url: '/pages/attendances/all-attendance',
          access: ['super_admin', 'admin'],
        },
      ],
    },
    {
      id: 'salary-management',
      title: 'Salary Management',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconCoin,
      access: ['super_admin', 'admin'],
      children: [
        {
          id: 'monthly-salaries',
          title: 'Monthly Salaries',
          type: 'item',
          url: '/pages/salary-management/monthly-salaries',
          access: ['super_admin', 'admin'],
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
      access: ['super_admin', 'admin'],
    },
    {
      id: 'leave-management',
      title: 'Leave Management',
      type: 'collapse',
      color: '#C70039',
      icon: icons.IconCalendarX,
      access: ['super_admin', 'admin', 'user'],
      children: [
        {
          id: 'my-leaves',
          title: 'My Leaves',
          type: 'item',
          url: '/pages/leave-management/my-leaves',
          access: ['user'],
        },
        {
          id: 'pending-leaves',
          title: 'Pending Leaves',
          type: 'item',
          url: '/pages/leave-management/pending-leaves',
          access: ['super_admin', 'admin'],
        },
        {
          id: 'approved-leaves',
          title: 'Approved Leaves',
          type: 'item',
          url: '/pages/leave-management/approved-leaves',
          access: ['super_admin', 'admin'],
        },
      ],
    },
  ],
};

export default pages;
