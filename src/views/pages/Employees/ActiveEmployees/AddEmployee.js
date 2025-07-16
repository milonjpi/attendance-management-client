import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import { useGetDesignationsQuery } from 'store/api/designation/designationApi';
import { useGetDepartmentsQuery } from 'store/api/department/departmentApi';
import { useGetLocationsQuery } from 'store/api/location/locationApi';
import { useCreateEmployeeMutation } from 'store/api/employee/employeeApi';
import UploadPhoto from './UploadPhoto';
import { Button, Tooltip } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import AddDesignation from 'views/Libraries/Designation/AddDesignation';
import AddDepartment from 'views/Libraries/Department/AddDepartment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 800 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const AddEmployee = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [joiningDate, setJoiningDate] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [department, setDepartment] = useState(null);
  const [location, setLocation] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  //  library open
  const [designationOpen, setDesignationOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  // library

  const { data: designationData } = useGetDesignationsQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const { data: departmentData } = useGetDepartmentsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const { data: locationData } = useGetLocationsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allDesignations = designationData?.data || [];
  const allDepartments = departmentData?.data || [];
  const allLocations = locationData?.locations || [];

  const dispatch = useDispatch();

  const [createEmployee] = useCreateEmployeeMutation();

  const onSubmit = async (data) => {
    setLoading(true);
    const { photo, signature, ...othersData } = data;

    const newData = {
      ...othersData,
      joiningDate,
      designationId: designation?.id,
      departmentId: department?.id,
      locationId: location?.id,
    };

    const formData = new FormData();
    formData.append('photo', photo[0] || null);
    formData.append('signature', signature ? signature[0] : null);
    formData.append('data', JSON.stringify(newData));

    try {
      const res = await createEmployee(formData).unwrap();
      if (res.success) {
        handleClose();
        reset();
        setDesignation(null);
        setDepartment(null);
        setLocation(null);
        setLoading(false);
        setJoiningDate(null);
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
            Add Employee
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
        {/* popup items */}
        <AddDesignation
          open={designationOpen}
          handleClose={() => setDesignationOpen(false)}
        />
        <AddDepartment
          open={departmentOpen}
          handleClose={() => setDepartmentOpen(false)}
        />
        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2.5}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                required
                label="Full Name"
                {...register('name', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Office ID"
                {...register('officeId')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  value={designation}
                  fullWidth
                  size="small"
                  options={allDesignations}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  onChange={(e, newValue) => setDesignation(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Designation"
                      required
                    />
                  )}
                />
                <Tooltip>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 0.5 }}
                    onClick={() => setDesignationOpen(true)}
                  >
                    <IconPlus />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Autocomplete
                  value={department}
                  fullWidth
                  size="small"
                  options={allDepartments}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  onChange={(e, newValue) => setDepartment(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Department" required />
                  )}
                />
                <Tooltip>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: 0, ml: 0.5 }}
                    onClick={() => setDepartmentOpen(true)}
                  >
                    <IconPlus />
                  </Button>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={location}
                fullWidth
                size="small"
                sx={{ mb: 2 }}
                options={allLocations}
                getOptionLabel={(option) =>
                  option.label + ', ' + option.area?.label
                }
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setLocation(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Branch" />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Joining Date"
                  inputFormat="DD/MM/YYYY"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  value={joiningDate}
                  onChange={(newValue) => {
                    setJoiningDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                fullWidth
                size="small"
                label="Contact No"
                sx={{ mb: 2 }}
                {...register('contactNo')}
              />
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="Address"
                {...register('address')}
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
                title="Employee Photo"
                width={135}
                height={135}
                register={register}
                reset={reset}
                name="photo"
                sx={{ mr: 1.5 }}
              />
              <UploadPhoto
                title="Signature (130x80)"
                width={130}
                height={80}
                register={register}
                reset={reset}
                name="signature"
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

export default AddEmployee;
