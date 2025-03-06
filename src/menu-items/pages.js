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
      ],
    },
    {
      id: 'attendances',
      title: 'Attendances',
      type: 'collapse',
      color: '#C70039',
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
      id: 'present-management',
      title: 'Present Management',
      type: 'item',
      color: '#610C9F',
      icon: icons.IconCalendarStats,
      url: '/pages/present-management',
    },
    {
      id: 'leave-management',
      title: 'Leave Management',
      type: 'item',
      color: '#C70039',
      icon: icons.IconCalendarX,
      url: '/pages/leave-management',
    },
  ],
};

export default pages;
