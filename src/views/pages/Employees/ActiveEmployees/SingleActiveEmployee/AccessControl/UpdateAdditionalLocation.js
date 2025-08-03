import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { useUpdateAdditionalLocationMutation } from 'store/api/employee/employeeApi';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, location, theme) {
  return {
    fontWeight: location.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 650 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const UpdateAdditionalLocation = ({
  open,
  handleClose,
  preData,
  employeeLocations,
  allLocations,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const [location, setLocation] = useState(employeeLocations || []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocation(typeof value === 'string' ? value.split(',') : value);
  };

  const dispatch = useDispatch();

  const [updateAdditionalLocation] = useUpdateAdditionalLocationMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newData = location?.map((el) => ({
      locationId: el,
    }));

    try {
      const res = await updateAdditionalLocation({
        id: preData?.id,
        body: { employeeLocations: [...newData] },
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
            Edit Additional Location
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
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-chip-location">
                  Select Branches
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-location"
                  multiple
                  value={location}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-location-chip"
                      label="Select Branches"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const loc = allLocations.find((l) => l.id === value);
                        return <Chip key={value} label={loc?.label} />;
                      })}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {allLocations.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name.id}
                      style={getStyles(name.id, location, theme)}
                    >
                      {name?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                Update Location
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateAdditionalLocation;
