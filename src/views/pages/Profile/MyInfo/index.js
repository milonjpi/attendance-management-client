import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainCard from 'ui-component/cards/MainCard';
import ImageShower from 'ui-component/ImageShower';
import { useState } from 'react';
import moment from 'moment';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import NotFoundEmployee from 'views/pages/Employees/NotFoundEmployee';

const MyInfo = () => {
  const userData = useSelector(selectAuth);
  const [open, setOpen] = useState(false);

  const { data: ggg, isLoading } = useGetSingleUserEmployeeQuery(
    userData.userName || '123',
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const employeeData = ggg?.data;

  if (!employeeData && !isLoading) {
    return <NotFoundEmployee />;
  }

  return (
    <MainCard title="My Info">
      <Grid container spacing={5} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ImageShower width={250} height={250} url={employeeData?.photo} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Grid container rowSpacing={5} columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <EmployeeItem title="Name" value={employeeData?.name} />
            </Grid>
            <Grid item xs={12} md={6}>
              <EmployeeItem
                title="Office ID"
                value={employeeData?.officeId || 'n/a'}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EmployeeItem
                title="Designation"
                value={employeeData?.designation?.label}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EmployeeItem
                title="Department"
                value={employeeData?.department?.label}
              />
            </Grid>
            <Grid item xs={12}>
              <EmployeeItem
                title="Branch"
                value={
                  employeeData?.location?.label +
                  ', ' +
                  employeeData?.location?.area?.label
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EmployeeItem
                title="Joining Date"
                value={
                  employeeData?.joiningDate
                    ? moment(employeeData?.joiningDate).format('DD/MM/YYYY')
                    : 'n/a'
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EmployeeItem
                title="Contact No"
                value={employeeData?.contactNo || 'n/a'}
              />
            </Grid>
            <Grid item xs={12}>
              <EmployeeItem
                title="Address"
                value={employeeData?.address || 'n/a'}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default MyInfo;

const EmployeeItem = ({ title, value }) => {
  return (
    <Box>
      <Typography sx={{ fontSize: 14, color: '#555555', fontWeight: 700 }}>
        {title}:
      </Typography>
      <Typography sx={{ fontSize: 13, color: '#555555' }}>{value}</Typography>
    </Box>
  );
};
