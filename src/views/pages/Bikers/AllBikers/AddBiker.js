import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { setRefresh } from 'store/refreshSlice';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { useGetBrandsQuery } from 'store/features/brand/brandApi';
import { selectAuth } from 'store/authSlice';
import { useGetDesignationsQuery } from 'store/features/designation/designationApi';
import { useGetDepartmentsQuery } from 'store/features/department/departmentApi';
import { useGetModelsQuery } from 'store/features/model/modelApi';
import { useGetEngineCCQuery } from 'store/features/engineCC/engineCCApi';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 500, md: 700 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddBiker = ({ open, handleClose }) => {
  const auth = useSelector(selectAuth);
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // library

  const { data: designationData } = useGetDesignationsQuery(auth?.accessToken, {
    refetchOnMountOrArgChange: true,
  });
  const { data: departmentData } = useGetDepartmentsQuery(auth?.accessToken, {
    refetchOnMountOrArgChange: true,
  });

  const { data: brandData } = useGetBrandsQuery(auth?.accessToken, {
    refetchOnMountOrArgChange: true,
  });
  const { data: modelData } = useGetModelsQuery(auth?.accessToken, {
    refetchOnMountOrArgChange: true,
  });

  const { data: engineCCData } = useGetEngineCCQuery(auth?.accessToken, {
    refetchOnMountOrArgChange: true,
  });
  const allDesignations = designationData?.data || [];
  const allDepartments = departmentData?.data || [];
  const allBrands = brandData?.data || [];
  const allModels = modelData?.data || [];
  const allEngineCC = engineCCData?.data || [];

  // filter model
  const filterModel = allModels?.filter((el) => el.brand?.label === brand);
  // end library

  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    const { bikerPhoto, nid, bikePaper, bikePhoto, ...bikerData } = data;
    if (!bikerPhoto || !bikerPhoto[0]) {
      return dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Biker Photo Needed',
        })
      );
    }
    if (!nid || !nid[0]) {
      return dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'Bike Paper Needed',
        })
      );
    }
    if (!bikePaper || !bikePaper[0]) {
      return dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: 'NID Needed',
        })
      );
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('bikerPhoto', bikerPhoto[0] || null);
    formData.append('nid', nid[0] || null);
    formData.append('bikePaper', bikePaper[0] || null);
    formData.append(
      'bikePhoto',
      bikePhoto && bikePhoto[0] ? bikePhoto[0] : null
    );
    formData.append('data', JSON.stringify(bikerData));
    axiosPrivate
      .post('/biker/create', formData)
      .then((res) => {
        handleClose();
        reset();
        setBrand(null);
        setModel(null);
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
            Add Biker
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
          <Typography sx={{ color: '#999999', fontSize: 16, mb: 1 }}>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Full Name"
                size="small"
                {...register('name', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Office ID"
                size="small"
                {...register('officeId', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                options={allDesignations.map((option) => option.label)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Designation"
                    {...register('designation', { required: true })}
                    required
                  />
                )}
              />
              <Autocomplete
                fullWidth
                size="small"
                options={allDepartments.map((option) => option.label)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Department"
                    {...register('department', { required: true })}
                    required
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <UploadPhoto
                title="Biker Photo"
                required
                sx={{ mr: 2 }}
                register={register}
                reset={reset}
                name="bikerPhoto"
              />
              <UploadPhoto
                title="NID"
                required
                register={register}
                reset={reset}
                name="nid"
              />
            </Grid>
          </Grid>

          {/* biker info */}
          <Typography sx={{ color: '#999999', fontSize: 16, mb: 1, mt: 2 }}>
            Bike Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={brand}
                fullWidth
                size="small"
                options={allBrands.map((option) => option.label)}
                onChange={(e, newValue) => {
                  setBrand(newValue);
                  setModel(null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Brand"
                    {...register('brand', { required: true })}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={model}
                fullWidth
                size="small"
                options={filterModel.map((option) => option.label)}
                onChange={(e, newValue) => setModel(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Model"
                    {...register('model', { required: true })}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                fullWidth
                size="small"
                options={allEngineCC.map((option) => option.label)}
                sx={{ mb: 2 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Engine CC"
                    {...register('cc', { required: true })}
                    required
                  />
                )}
              />
              <TextField
                fullWidth
                required
                label="Registration No"
                size="small"
                {...register('regNo', { required: true })}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <UploadPhoto
                title="Bike Paper"
                required
                sx={{ mr: 2 }}
                register={register}
                reset={reset}
                name="bikePaper"
              />
              <UploadPhoto
                title="Bike Photo"
                register={register}
                reset={reset}
                name="bikePhoto"
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

export default AddBiker;

const UploadPhoto = ({
  title,
  required = false,
  register,
  reset,
  name,
  sx = {},
}) => {
  const [photo, setPhoto] = useState(null);

  const handlePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (x) => {
        setPhoto(x.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setPhoto(null);
    }
  };
  const handleRemove = (id) => {
    reset({ [id]: null });
    setPhoto(null);
  };
  return (
    <Box
      sx={{
        position: 'relative',
        background: '#00000017',
        backgroundImage: `url('${photo}')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        border: '1px solid #00000025',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 95,
        borderRadius: 1,
        ...sx,
      }}
    >
      {photo ? (
        <Button
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            minWidth: 0,
            p: 0,
            background: '#000000b2',
            '&:hover': {
              background: '#000000b2',
            },
          }}
          onClick={() => handleRemove(name)}
        >
          <ClearIcon color="error" sx={{ fontSize: 16 }} />
        </Button>
      ) : (
        <IconButton component="label" color="primary" size="small">
          <CloudUploadIcon fontSize="small" />
          <VisuallyHiddenInput
            type="file"
            {...register(name, { onChange: (e) => handlePreview(e) })}
          />
        </IconButton>
      )}

      <Typography
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 11,
          background: '#00000052',
          py: 0.3,
          color: '#fff',
        }}
      >
        {title}
        {required ? <span style={{ color: 'red' }}>*</span> : null}
      </Typography>
    </Box>
  );
};
