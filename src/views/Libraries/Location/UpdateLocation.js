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
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useUpdateLocationMutation } from 'store/api/location/locationApi';
import { useGetAreasQuery } from 'store/api/area/areaApi';
import { Autocomplete } from '@mui/material';

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

const UpdateLocation = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState(preData?.area || null);
  const { register, handleSubmit } = useForm({ defaultValues: preData });

  // library
  const { data: areaData, isLoading: areaLoading } = useGetAreasQuery(
    { page: 0, limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allAreas = areaData?.areas || [];
  // end library

  const dispatch = useDispatch();

  const [updateLocation] = useUpdateLocationMutation();

  const onSubmit = async (data) => {
    setLoading(true);
    const newData = {
      label: data?.label,
      areaId: area?.id,
      address: data?.address,
    };
    try {
      const res = await updateLocation({
        id: preData?.id,
        body: newData,
      }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
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
            Edit Branch
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
            <Grid item xs={12}>
              <Autocomplete
                loading={areaLoading}
                value={area}
                fullWidth
                size="small"
                options={allAreas}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setArea(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Area" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Branch"
                size="small"
                {...register('label', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Address"
                size="small"
                {...register('address', { required: true })}
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
                <span style={{ lineHeight: 1 }}>Update</span>
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateLocation;
