// assets
import {
  IconBrandToyota,
  IconMotorbike,
  IconBrandSpeedtest,
  IconComponents,
  IconStack,
} from '@tabler/icons-react';

// constant
const icons = {
  IconBrandToyota,
  IconMotorbike,
  IconBrandSpeedtest,
  IconComponents,
  IconStack,
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
      id: 'brand',
      title: 'Brand',
      type: 'item',
      color: '#344A80',
      icon: icons.IconBrandToyota,
      url: '/libraries/brand',
    },
    {
      id: 'model',
      title: 'Model',
      type: 'item',
      color: '#02BAE5',
      icon: icons.IconMotorbike,
      url: '/libraries/model',
    },
    {
      id: 'cc',
      title: 'Engine CC',
      type: 'item',
      color: '#B33014',
      icon: icons.IconBrandSpeedtest,
      url: '/libraries/cc',
    },
  ],
};

export default libraries;
