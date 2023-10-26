import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';

import { useGetGuardsQuery } from 'store/features/guard/guardApi';
import { selectAuth } from 'store/authSlice';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useDeleteAuthLogMutation } from 'store/features/authLog/authLogApi';
import { setToast } from 'store/toastSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 500 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const BikeEntry = ({ open, handleClose, bikerId }) => {
  const [loading, setLoading] = useState(false);
  const [guard, setGuard] = useState(null);

  // get auth
  const auth = useSelector(selectAuth);

  // get Guards
  const { data: guardData } = useGetGuardsQuery(
    { token: auth?.accessToken, query: { isActive: true } },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const allGuards = guardData?.data || [];

  // remove auth log data
  const [deleteAuthLog] = useDeleteAuthLogMutation();

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  // submitting data
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newData = {
      bikerId,
      entryGuardId: guard?.id,
      inTime: new Date(),
      inStand: true,
    };
    axiosPrivate
      .post('/standLog/create', newData)
      .then((res) => {
        setLoading(false);
        deleteAuthLog();
        handleClose();
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res.data?.message,
          })
        );
        setGuard(null);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            variant: 'error',
            message: err.response?.data?.message || 'Something Went Wrong',
            errorMessages: err.response?.data?.errorMessages,
          })
        );
      });
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
            Bike Entry
          </Typography>
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                value={guard}
                fullWidth
                size="small"
                options={allGuards}
                getOptionLabel={(option) =>
                  option.officeId + ' => ' + option.name
                }
                onChange={(e, newValue) => setGuard(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Who You Are" required />
                )}
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
                Confirm Entry
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default BikeEntry;
