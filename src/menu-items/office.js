// assets
import { IconFileInvoice, IconReceipt2 } from '@tabler/icons-react';

// constant
const icons = {
  IconFileInvoice,
  IconReceipt2,
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const offices = {
  id: 'offices',
  title: 'Office Management',
  type: 'group',
  access: ['super_admin', 'admin', 'user'],
  children: [
    {
      id: 'conveyances',
      title: 'Conveyances',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconFileInvoice,
      access: ['super_admin', 'admin', 'user'],
      children: [
        {
          id: 'my-conveyances',
          title: 'My Conveyances',
          type: 'item',
          url: '/offices/conveyances/my-conveyances',
          access: ['user'],
        },
        {
          id: 'pending-conveyances',
          title: 'Pending Conveyances',
          type: 'item',
          url: '/offices/conveyances/pending-conveyances',
          access: ['super_admin', 'admin'],
        },
        {
          id: 'all-conveyances',
          title: 'All Conveyances',
          type: 'item',
          url: '/offices/conveyances/all-conveyances',
          access: ['super_admin', 'admin'],
        },
        {
          id: 'conveyance-library',
          title: 'Library',
          type: 'item',
          url: '/offices/conveyances/conveyance-library',
          access: ['super_admin', 'admin', 'user'],
        },
      ],
    },
    {
      id: 'bills',
      title: 'Bills',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconReceipt2,
      access: ['super_admin', 'admin', 'user'],
      children: [
        {
          id: 'my-bills',
          title: 'My Bills',
          type: 'item',
          url: '/offices/bills/my-bills',
          access: ['user'],
        },
        {
          id: 'pending-bills',
          title: 'Pending Bills',
          type: 'item',
          url: '/offices/bills/pending-bills',
          access: ['super_admin', 'admin'],
        },
        {
          id: 'all-bills',
          title: 'All Bills',
          type: 'item',
          url: '/offices/bills/all-bills',
          access: ['super_admin', 'admin'],
        },
        {
          id: 'bill-library',
          title: 'Library',
          type: 'item',
          url: '/offices/bills/bill-library',
          access: ['super_admin', 'admin', 'user'],
        },
      ],
    },
  ],
};

export default offices;
