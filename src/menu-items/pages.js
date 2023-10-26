// assets
import {
  IconBarcode,
  IconBike,
  IconParking,
  IconShieldCheckeredFilled,
  IconChartHistogram,
} from '@tabler/icons-react';

// constant
const icons = {
  IconBarcode,
  IconBike,
  IconParking,
  IconShieldCheckeredFilled,
  IconChartHistogram,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'start',
      title: 'Start Scan',
      type: 'item',
      color: '#004ED3',
      icon: icons.IconBarcode,
      url: '/pages/start',
    },
    {
      id: 'guest-parking',
      title: 'Guest Parking',
      type: 'collapse',
      color: '#AD3A81',
      icon: icons.IconParking,
      children: [
        {
          id: 'guest-parking-operation',
          title: 'New Parking',
          type: 'item',
          url: '/pages/guest-parking/guest-parking-operation',
        },
        {
          id: 'guest-in-stand',
          title: 'Guest In Stand',
          type: 'item',
          url: '/pages/guest-parking/guest-in-stand',
        },
        {
          id: 'guest-list',
          title: 'Guest List',
          type: 'item',
          url: '/pages/guest-parking/guest-list',
        },
        {
          id: 'guest-card',
          title: 'Guest Card',
          type: 'item',
          url: '/pages/guest-parking/guest-card',
        },
      ],
    },
    {
      id: 'bikers',
      title: 'Bikers',
      type: 'collapse',
      color: '#AD3A81',
      icon: icons.IconBike,
      children: [
        {
          id: 'all-bikers',
          title: 'All Bikers',
          type: 'item',
          url: '/pages/bikers/all-bikers',
        },
        {
          id: 'in-stand',
          title: 'In Stand',
          type: 'item',
          url: '/pages/bikers/in-stand',
        },
      ],
    },
    {
      id: 'guards',
      title: 'The Guards',
      type: 'item',
      color: '#704C8D',
      icon: icons.IconShieldCheckeredFilled,
      url: '/pages/guards',
    },
    {
      id: 'report',
      title: 'Report',
      type: 'collapse',
      color: '#3B507B',
      icon: icons.IconChartHistogram,
      children: [
        {
          id: 'in-stand-report',
          title: 'In Stand Report',
          type: 'item',
          url: '/pages/report/in-stand-report',
        },
        {
          id: 'all-stand-report',
          title: 'All Stand Report',
          type: 'item',
          url: '/pages/report/all-stand-report',
        },
      ],
    },
  ],
};

export default pages;
