// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const userData = useSelector(selectAuth);

  const menus = userData?.menus?.map((el) => el.label);
  const userMenuItems = menuItem.items.filter(
    (el) => el.access?.includes(userData?.role) || menus?.includes(el.id)
  );
  const navItems = userMenuItems.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
