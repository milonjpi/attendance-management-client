import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import { useLocation, Link, useParams, Outlet } from 'react-router-dom';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import InfoIcon from '@mui/icons-material/Info';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CurrencyLiraIcon from '@mui/icons-material/CurrencyLira';
import { useGetSingleEmployeeQuery } from 'store/api/employee/employeeApi';
import NotFoundEmployee from '../../NotFoundEmployee';

const NavItem = styled(ButtonBase)`
  border-radius: 5px 5px 0 0;
  min-width: 125px;
`;

const SingleActiveEmployee = () => {
  const { id } = useParams();

  // location
  let location = useLocation();
  const path = location?.pathname?.split('/')[5] || '';

  const { data, isLoading } = useGetSingleEmployeeQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const employeeData = data?.data;

  if (!employeeData && !isLoading) {
    return <NotFoundEmployee />;
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
            {employeeData?.name ? (
              <span>
                {employeeData?.name}{' '}
                <span
                  style={{
                    color: '#fff',
                    background: employeeData?.isActive ? 'green' : 'red',
                    fontWeight: 700,
                    fontSize: 8,
                    padding: '3px 5px 3px 5px',
                    lineHeight: 1,
                    display: 'inline-block',
                    borderRadius: 5,
                  }}
                >
                  {employeeData?.isActive ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </span>
            ) : (
              'Loading...'
            )}
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
            to="access"
            sx={{
              py: 0.6,
              px: 1.5,
              color: path === 'access' ? '#614cab' : '#fff',
              background: path === 'access' ? '#fff' : 'transparent',
            }}
          >
            <LockPersonIcon sx={{ fontSize: '1.2rem' }} />
            <span style={{ paddingLeft: '5px' }}>Access Control</span>
          </NavItem>
          <NavItem
            component={Link}
            to="attendance"
            sx={{
              py: 0.6,
              px: 1.5,
              color: path === 'attendance' ? '#614cab' : '#fff',
              background: path === 'attendance' ? '#fff' : 'transparent',
            }}
          >
            <DateRangeIcon sx={{ fontSize: '1.2rem' }} />
            <span style={{ paddingLeft: '5px' }}>Attendances</span>
          </NavItem>
          <NavItem
            component={Link}
            to="Salary"
            sx={{
              py: 0.6,
              px: 1.5,
              color: path === 'Salary' ? '#614cab' : '#fff',
              background: path === 'Salary' ? '#fff' : 'transparent',
            }}
          >
            <CurrencyLiraIcon sx={{ fontSize: '1.2rem' }} />
            <span style={{ paddingLeft: '5px' }}>Salary Record</span>
          </NavItem>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Outlet context={{ data: employeeData }} />
      </Box>
    </Paper>
  );
};

export default SingleActiveEmployee;
