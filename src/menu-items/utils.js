// assets
import { IconSettings, IconHelp } from '@tabler/icons';

// constant
const icons = { IconSettings, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const utils = {
  id: 'utils',
  title: 'Utilities',
  type: 'group',
  access: ['super_admin', 'admin', 'user'],
  children: [
    {
      id: 'setting',
      title: 'Settings',
      type: 'collapse',
      color: '#0C356A',
      icon: icons.IconSettings,
      access: ['super_admin'],
      children: [
        {
          id: 'manage-user',
          title: 'Manage Users',
          type: 'item',
          url: '/utils/setting/manage-user',
          access: ['super_admin'],
        },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      type: 'item',
      color: '#0C356A',
      url: '/utils/support',
      icon: icons.IconHelp,
      access: ['super_admin', 'admin', 'user'],
      // external: true,
      // target: true
    },
  ],
};

export default utils;
