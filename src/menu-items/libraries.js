// assets
import {
  IconComponents,
  IconStack,
  IconCurrentLocation,
  IconHierarchy,
} from '@tabler/icons-react';

// constant
const icons = {
  IconComponents,
  IconStack,
  IconCurrentLocation,
  IconHierarchy,
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
      id: 'area',
      title: 'Area',
      type: 'item',
      color: '#344A80',
      icon: icons.IconCurrentLocation,
      url: '/libraries/area',
    },
    {
      id: 'branch',
      title: 'Branch',
      type: 'item',
      color: '#344A80',
      icon: icons.IconHierarchy,
      url: '/libraries/branch',
    },
  ],
};

export default libraries;
