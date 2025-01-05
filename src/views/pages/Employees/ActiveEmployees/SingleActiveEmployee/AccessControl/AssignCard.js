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
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { useCreateDeviceUserMutation } from 'store/api/device/deviceApi';
import bigInt from 'big-integer';

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

const AssignCard = ({ open, handleClose, employeeData }) => {
  const [loading, setLoading] = useState(false);
  const [codeFirst, setCodeFirst] = useState('');
  const [codeSecond, setCodeSecond] = useState('');

  const dispatch = useDispatch();

  const [createDeviceUser] = useCreateDeviceUserMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const firstPart = (parseInt(codeFirst).toString(16) + '0').slice(0, 3);
    const secondPart = ('00' + parseInt(codeSecond).toString(16)).slice(-5);
    const hex = firstPart + secondPart;
    const rfId = bigInt('0x' + hex);
    const newData = {
      ID: employeeData?.officeId,
      Name: employeeData?.name,
      RFID: rfId?.toString(),
    };
    try {
      const res = await createDeviceUser({ ...newData }).unwrap();

      if (res.success) {
        handleClose();
        setCodeFirst('');
        setCodeSecond('');
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
            Assign Card
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
              <TextField
                fullWidth
                size="small"
                label="Office ID"
                defaultValue={employeeData?.officeId}
                inputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                required
                type="number"
                label="Card Code 1st Part"
                value={codeFirst}
                onChange={(e) => setCodeFirst(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                required
                type="number"
                label="Card Code Last Part"
                value={codeSecond}
                onChange={(e) => setCodeSecond(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="primary"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AssignCard;
