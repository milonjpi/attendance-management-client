// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useGetProfileQuery } from 'store/api/profile/profileApi';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { data } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = data?.data;
  const menus = userData?.menus?.map((el) => el.label);
  const userMenuItems = menuItem.items.filter((el) =>
    ['super_admin', 'admin'].includes(userData?.role)
      ? true
      : menus?.includes(el.id)
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
