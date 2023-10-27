// assets
import {
  IconBarcode,
  IconBike,
  IconParking,
  IconShieldCheckeredFilled,
  IconChartHistogram,
  IconUsersGroup,
} from '@tabler/icons-react';

// constant
const icons = {
  IconBarcode,
  IconBike,
  IconParking,
  IconShieldCheckeredFilled,
  IconChartHistogram,
  IconUsersGroup,
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
      color: '#AD3A81',
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
  ],
};

export default pages;
