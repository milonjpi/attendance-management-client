import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';

const menuList = [
  {
    id: 1,
    label: 'Designation',
    path: 'designation',
    access: ['super_admin', 'admin', 'user'],
  },
  {
    id: 2,
    label: 'Department',
    path: 'department',
    access: ['super_admin', 'admin', 'user'],
  },
  {
    id: 3,
    label: 'Area',
    path: 'area',
    access: ['super_admin'],
  },
  {
    id: 4,
    label: 'Branch',
    path: 'branch',
    access: ['super_admin'],
  },
];

const EmployeeLibrary = () => {
  const userData = useSelector(selectAuth);
  // location
  let location = useLocation();
  const path = location?.pathname?.split('/')[4] || '';
  const filterMenu = menuList?.filter((el) =>
    el.access.includes(userData.role)
  );

  return (
    <>
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={path}
          textColor="secondary"
          indicatorColor="secondary"
          size="small"
          variant="scrollable"
          scrollButtons="auto"
        >
          {filterMenu?.map((el) => (
            <Tab
              key={el.id}
              value={el.path}
              label={el.label}
              component={Link}
              to={`${el.path}`}
            />
          ))}
        </Tabs>
      </Paper>
      <Box sx={{ pt: 1 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default EmployeeLibrary;
