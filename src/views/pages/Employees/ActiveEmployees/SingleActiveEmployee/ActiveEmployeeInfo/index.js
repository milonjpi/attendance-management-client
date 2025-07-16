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
import { FormControlLabel, Switch } from '@mui/material';
import { useUpdateEmployeeMutation } from 'store/api/employee/employeeApi';
import { useEffect } from 'react';
import CreateUser from './CreateUser';

const ActiveEmployeeInfo = () => {
  const { data } = useOutletContext();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [isOwn, setIsWon] = useState(data?.isOwn || false);

  const [updateEmployee] = useUpdateEmployeeMutation();
  const onManagementChange = async (e) => {
    const newData = {
      isOwn: e.target.checked,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(newData));
    try {
      setIsWon(e.target.checked);
      await updateEmployee({
        id: data?.id,
        body: formData,
      }).unwrap();
    } catch (err) {}
  };

  useEffect(() => {
    setIsWon(data?.isOwn);
  }, [data]);

  return (
    <Box>
      <Box sx={{ py: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            {data?.isActive && !data.userCreated ? (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                sx={{ fontSize: 11 }}
                onClick={() => setUserOpen(true)}
              >
                Create User
              </Button>
            ) : null}
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}
      {data?.isActive ? (
        <>
          <UpdateEmployee
            open={open}
            handleClose={() => setOpen(false)}
            preData={data}
          />
          <CreateUser
            open={userOpen}
            handleClose={() => setUserOpen(false)}
            userData={data}
          />
        </>
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ImageShower width={250} height={250} url={data?.photo} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ImageShower width={130} height={80} url={data?.signature} />
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
                    title="Branch"
                    value={
                      data?.location?.label + ', ' + data?.location?.area?.label
                    }
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
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    disabled={!data?.isActive}
                    control={
                      <Switch
                        checked={isOwn || false}
                        onChange={onManagementChange}
                      />
                    }
                    label="Management"
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
