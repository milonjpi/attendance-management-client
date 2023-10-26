// assets
import { IconSettings, IconHelp } from '@tabler/icons';

// constant
const icons = { IconSettings, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const utils = {
  id: 'utils',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'setting',
      title: 'Settings',
      type: 'collapse',
      color: '#2F0F5D',
      icon: icons.IconSettings,
      children: [
        {
          id: 'manage-user',
          title: 'Manage Users',
          type: 'item',
          url: '/utils/setting/manage-user',
        },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      type: 'item',
      url: '/utils/support',
      icon: icons.IconHelp,
      // external: true,
      // target: true
    },
  ],
};

export default utils;
