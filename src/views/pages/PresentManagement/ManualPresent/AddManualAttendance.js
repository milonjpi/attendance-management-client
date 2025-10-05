import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { useCreateAttendanceMutation } from 'store/api/attendance/attendanceApi';
import { useGetEmployeesQuery } from 'store/api/employee/employeeApi';
import { useGetLocationsQuery } from 'store/api/location/locationApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 600 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 3,
};

const AddManualAttendance = ({ open, handleClose, userData, userEmployee }) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [date, setDate] = useState(moment());
  const [remarks, setRemarks] = useState('');

  // library
  const { data: locationData } = useGetLocationsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allLocations = locationData?.locations || [];
  // employee
  const query = {};

  query['limit'] = 100;
  query['page'] = 0;
  query['isActive'] = true;
  query['isOwn'] = false;
  query['locationId'] = userEmployee?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  if (location) {
    query['locationId'] = location?.id;
  }

  const { data: employeeData } = useGetEmployeesQuery({ ...query });
  const employees = employeeData?.employees || [];

  const dispatch = useDispatch();

  const [createAttendance] = useCreateAttendanceMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newData = {
      officeId: employee?.officeId,
      date: date,
      inTime: date,
      remarks: remarks || '',
    };
    try {
      const res = await createAttendance({ ...newData }).unwrap();

      if (res.success) {
        handleClose();
        setLocation(null);
        setEmployee(null);
        setDate(moment());
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
          errorMessages: err?.data?.errorMessages,
        })
      );
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#878781' }}>
            Add Attendance
          </Typography>
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {userData?.role === 'super_admin' ? (
              <Grid item xs={12} md={6}>
                <Autocomplete
                  value={location}
                  fullWidth
                  size="small"
                  options={allLocations}
                  getOptionLabel={(option) =>
                    option.label + ', ' + option.area?.label
                  }
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  onChange={(e, newValue) => {
                    setLocation(newValue);
                    setEmployee(null);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Branch" />
                  )}
                />
              </Grid>
            ) : null}

            <Grid item xs={12} md={userData?.role === 'super_admin' ? 6 : 12}>
              <Autocomplete
                value={employee}
                fullWidth
                size="small"
                options={employees}
                getOptionLabel={(option) =>
                  option.officeId + ', ' + option.name
                }
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setEmployee(newValue)}
                renderInput={(params) => (
                  <TextField {...params} required label="Select Employee" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label="Date Time"
                  inputFormat="DD/MM/YYYY hh:mm A"
                  value={date}
                  //   views={['year', 'day', 'hours', 'minutes', 'seconds']}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} required fullWidth size="small" />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Early Note/Additional Note"
                size="small"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="primary"
                sx={{ py: 1 }}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                <span style={{ lineHeight: 1 }}>Submit</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddManualAttendance;
