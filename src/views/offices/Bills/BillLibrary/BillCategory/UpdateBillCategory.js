import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import { useUpdateItemMutation } from 'store/api/item/itemApi';

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

const UpdateBillCategory = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [itemType, setItemType] = useState(preData?.isService);

  const { register, handleSubmit } = useForm({ defaultValues: preData });

  const dispatch = useDispatch();

  const [updateItem] = useUpdateItemMutation();

  const onSubmit = async (data) => {
    const newData = {
      label: data?.label,
      isService: itemType,
    };
    try {
      setLoading(true);
      const res = await updateItem({ id: preData?.id, body: newData }).unwrap();

      if (res.success) {
        handleClose();
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Item Updated Successfully',
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
            Edit Bill Item
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                required
                size="small"
                label="Bill Item"
                {...register('label', { required: true })}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required size="small">
                <InputLabel id="select-item-type-id">Type</InputLabel>
                <Select
                  labelId="select-item-type-id"
                  value={itemType}
                  label="Type"
                  onChange={(e) => setItemType(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={false}>Product</MenuItem>
                  <MenuItem value={true}>Service</MenuItem>
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
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default UpdateBillCategory;
