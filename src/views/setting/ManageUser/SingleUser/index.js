import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { useLocation, Link, useParams, Outlet } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import InfoIcon from '@mui/icons-material/Info';
import NotFoundUser from './NotFoundUser';
import { useGetSingleUserQuery } from 'store/api/user/userApi';

const NavItem = styled(ButtonBase)`
  border-radius: 5px 5px 0 0;
  min-width: 125px;
`;

const SingleUser = () => {
  const { id } = useParams();

  // location
  let location = useLocation();
  const path = location?.pathname?.split('/')[5] || '';

  const { data, isLoading } = useGetSingleUserQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const userData = data?.data;

  if (!userData && !isLoading) {
    return <NotFoundUser />;
  }

  return (
    <Paper>
      <Box
        sx={{
          px: 2,
          pt: 2,
          background: 'linear-gradient(to right, #614cab 0%, #614cab99 100%)',
          borderRadius: '5px 5px 0 0',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 18, color: '#fff', lineHeight: 1 }}>
            {userData?.fullName ? userData?.fullName : 'Loading...'}
          </Typography>
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <NavItem
            component={Link}
            to=""
            sx={{
              py: 0.6,
              px: 1.5,
              color: path === '' ? '#614cab' : '#fff',
              background: path === '' ? '#fff' : 'transparent',
            }}
          >
            <InfoIcon sx={{ fontSize: '1.2rem' }} />
            <span style={{ paddingLeft: '5px' }}>Info</span>
          </NavItem>
          <NavItem
            component={Link}
            to="permission"
            sx={{
              py: 0.6,
              px: 1.5,
              color: path === 'permission' ? '#614cab' : '#fff',
              background: path === 'permission' ? '#fff' : 'transparent',
            }}
          >
            <LockPersonIcon sx={{ fontSize: '1.2rem' }} />
            <span style={{ paddingLeft: '5px' }}>Permissions</span>
          </NavItem>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Outlet context={{ data: userData }} />
      </Box>
    </Paper>
  );
};

export default SingleUser;
