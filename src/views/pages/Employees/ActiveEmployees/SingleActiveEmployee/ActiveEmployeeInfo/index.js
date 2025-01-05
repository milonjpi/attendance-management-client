import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useOutletContext } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import ImageShower from 'ui-component/ImageShower';
import UpdateEmployee from '../../UpdateEmployee';
import { useState } from 'react';
import moment from 'moment';

const ActiveEmployeeInfo = () => {
  const { data } = useOutletContext();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box sx={{ py: 2 }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          size="small"
          color="dark"
          component={Link}
          sx={{ color: '#fff' }}
          to={`/pages/employee-management/${
            data?.isActive ? 'employees' : 'resigned-employees'
          }`}
        >
          Back
        </Button>
      </Box>
      {/* popup items */}
      {data?.isActive ? (
        <UpdateEmployee
          open={open}
          handleClose={() => setOpen(false)}
          preData={data}
        />
      ) : null}

      {/* end popup items */}
      <Box>
        <MainCard
          title="Employee Information"
          secondary={
            data?.isActive ? (
              <IconButton
                color="primary"
                size="small"
                onClick={() => setOpen(true)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            ) : null
          }
        >
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
                <ImageShower width={250} height={250} url={data?.photo} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <Grid container rowSpacing={5} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                  <EmployeeItem title="Employee Name" value={data?.name} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EmployeeItem
                    title="Employee ID"
                    value={data?.officeId || 'n/a'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EmployeeItem
                    title="Designation"
                    value={data?.designation?.label}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EmployeeItem
                    title="Department"
                    value={data?.department?.label}
                  />
                </Grid>
                <Grid item xs={12}>
                  <EmployeeItem
                    title="Location"
                    value={data?.location?.label}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EmployeeItem
                    title="Joining Date"
                    value={
                      data?.joiningDate
                        ? moment(data?.joiningDate).format('DD/MM/YYYY')
                        : 'n/a'
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EmployeeItem
                    title="Contact No"
                    value={data?.contactNo || 'n/a'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EmployeeItem
                    title="Address"
                    value={data?.address || 'n/a'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Box>
    </Box>
  );
};

export default ActiveEmployeeInfo;

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
