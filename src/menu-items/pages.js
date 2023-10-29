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
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'employees',
      title: 'Employees',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconUsersGroup,
      children: [
        {
          id: 'active-employees',
          title: 'Active Employees',
          type: 'item',
          url: '/pages/employees/active-employees',
        },
        {
          id: 'resigned-employees',
          title: 'Resigned Employees',
          type: 'item',
          url: '/pages/employees/resigned-employees',
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
  ],
};

export default pages;
