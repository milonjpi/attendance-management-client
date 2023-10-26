import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { setRefresh } from 'store/refreshSlice';
import { setToast } from 'store/toastSlice';
import { selectAuth } from 'store/authSlice';
import { useGetBrandsQuery } from 'store/features/brand/brandApi';

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

const UpdateModel = ({ open, handleClose, preData }) => {
  const auth = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState(preData?.brand || null);
  const { register, handleSubmit } = useForm({ defaultValues: preData });

  // library
  const { data: brandData } = useGetBrandsQuery(auth?.accessToken, {
    refetchOnMountOrArgChange: true,
  });
  const allBrands = brandData?.data || [];
  // end library

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    setLoading(true);
    const newData = {
      brandId: brand?.id,
      label: data?.label,
    };
    axiosPrivate
      .patch(`/model/${data?.id}`, newData)
      .then((res) => {
        handleClose();
        dispatch(setRefresh());
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res.data?.message,
          })
        );
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
            Edit Model
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
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                value={brand}
                fullWidth
                size="small"
                options={allBrands}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => setBrand(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Brand" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Model"
                {...register('label', { required: true })}
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

export default UpdateModel;
