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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { useCreateLeaveMutation } from 'store/api/leave/leaveApi';

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

const AddMyLeave = ({ open, handleClose, employeeData }) => {
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // days count
  const firstDate = moment(fromDate, 'YYYY-MM-DD');
  const secondDate = moment(toDate, 'YYYY-MM-DD');

  const daysDifference =
    fromDate && fromDate?.isValid() && toDate && toDate?.isValid()
      ? secondDate.diff(firstDate, 'days') + 1
      : 0;

  const dispatch = useDispatch();

  const [createLeave] = useCreateLeaveMutation();

  const onSubmit = async (data) => {
    setLoading(true);
    const newData = {
      officeId: employeeData?.officeId,
      fromDate: fromDate,
      toDate: toDate,
      days: daysDifference,
      remarks: data?.remarks || '',
      status: 'Pending',
    };

    try {
      const res = await createLeave({ ...newData }).unwrap();

      if (res.success) {
        handleClose();
        setFromDate(null);
        setToDate(null);
        reset();
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
            Leave Application
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
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date (From)"
                  inputFormat="DD/MM/YYYY"
                  value={fromDate}
                  onChange={(newValue) => {
                    setFromDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date (To)"
                  inputFormat="DD/MM/YYYY"
                  value={toDate}
                  minDate={fromDate}
                  maxDate={
                    fromDate ? moment(fromDate).endOf('month') : undefined
                  }
                  onChange={(newValue) => {
                    setToDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth size="small" required />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                InputProps={{ readOnly: true }}
                label="Count"
                size="small"
                value={daysDifference}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Reason"
                size="small"
                {...register('remarks', { required: true })}
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

export default AddMyLeave;
