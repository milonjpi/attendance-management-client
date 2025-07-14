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
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { useGetLocationsQuery } from 'store/api/location/locationApi';
import { useCreateMonthSalaryMutation } from 'store/api/monthSalary/monthSalaryApi';
import { monthList, salaryYear } from 'assets/data';
import moment from 'moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 550 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const CreatePaySlip = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [location, setLocation] = useState(null);

  // library
  const { data: locationData, isLoading: locationLoading } =
    useGetLocationsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const allLocations = locationData?.locations || [];

  // end library

  const dispatch = useDispatch();

  const [createMonthSalary] = useCreateMonthSalaryMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newData = {
      year: year,
      month: month,
      locationId: location?.id,
    };

    try {
      const res = await createMonthSalary({ ...newData }).unwrap();
      if (res.success) {
        handleClose();
        setLocation(null);
        setYear(null);
        setMonth(null);
        setLoading(false);
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Pay Slip Created Successfully',
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
            Create Pay Slip
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

        {/* end popup items */}
        <Box component="form" autoComplete="off" onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={year}
                fullWidth
                size="small"
                options={salaryYear}
                onChange={(e, newValue) => {
                  setYear(newValue);
                  setMonth(null);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Year" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={month}
                fullWidth
                size="small"
                options={monthList}
                getOptionDisabled={(option) =>
                  !year ||
                  (year &&
                    parseInt(
                      moment(`${year}-${option}`, 'YYYY-MMMM').format('YYYYMM')
                    ) >= parseInt(moment().format('YYYYMM')))
                }
                onChange={(e, newValue) => setMonth(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Month" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                loading={locationLoading}
                value={location}
                fullWidth
                size="small"
                options={allLocations}
                getOptionLabel={(option) =>
                  option.label + ', ' + option.area?.label
                }
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setLocation(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Branch" required />
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
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CreatePaySlip;
