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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 450, md: 550 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 3,
};

const AddAttendance = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [date, setDate] = useState(moment());

  // library
  const query = {};

  query['limit'] = 100;
  query['page'] = 0;
  const { data: employeeData } = useGetEmployeesQuery({ ...query });
  const employees = employeeData?.employees || [];

  const dispatch = useDispatch();

  const [createAttendance] = useCreateAttendanceMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newData = {
      officeId: employee?.officeId,
      date: moment(date).add(6, 'hours'),
      inTime: moment(date).add(6, 'hours'),
    };
    try {
      const res = await createAttendance({ ...newData }).unwrap();

      if (res.success) {
        handleClose();
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                  label="Date From"
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

export default AddAttendance;
