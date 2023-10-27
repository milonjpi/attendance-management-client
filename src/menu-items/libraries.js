// assets
import {
  IconComponents,
  IconStack,
  IconCurrentLocation,
} from '@tabler/icons-react';

// constant
const icons = {
  IconComponents,
  IconStack,
  IconCurrentLocation,
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const libraries = {
  id: 'libraries',
  title: 'Libraries',
  type: 'group',
  children: [
    {
      id: 'designation',
      title: 'Designation',
      type: 'item',
      color: '#991A84',
      icon: icons.IconComponents,
      url: '/libraries/designation',
    },
    {
      id: 'department',
      title: 'Department',
      type: 'item',
      color: '#1442B3',
      icon: icons.IconStack,
      url: '/libraries/department',
    },
    {
      id: 'location',
      title: 'Location',
      type: 'item',
      color: '#344A80',
      icon: icons.IconCurrentLocation,
      url: '/libraries/location',
    },
  ],
};

export default libraries;
