import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  IconDeviceFloppy,
  IconSquareRoundedPlusFilled,
} from '@tabler/icons-react';
import { totalSum } from 'views/utilities/NeedyFunction';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useGetItemTypesQuery } from 'store/api/itemType/itemTypeApi';
import { useGetVehicleTypesQuery } from 'store/api/vehicleType/vehicleTypeApi';
import {
  useGetConveyanceLocationsQuery,
  useUpdateConveyanceMutation,
} from 'store/api/conveyance/conveyanceApi';
import ConveyanceFields from './ConveyanceFields';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 550, md: 850 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const defaultValue = {
  itemType: null,
  from: null,
  to: null,
  distance: '',
  vehicleType: null,
  details: '',
  amount: '',
};

const UpdateConveyance = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(preData?.date);

  // library
  const { data: itemTypeData } = useGetItemTypesQuery(
    { limit: 500, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );
  const allItemTypes = itemTypeData?.itemTypes || [];

  const { data: vehicleTypeData } = useGetVehicleTypesQuery(
    { limit: 500, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );
  const allVehicleTypes = vehicleTypeData?.vehicleTypes || [];
  const { data: locationData } = useGetConveyanceLocationsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const allLocations = locationData?.locations || [];

  // end library

  // hook form
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: preData,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'conveyanceDetails',
  });

  const handleAppend = () => {
    append(defaultValue);
  };
  const handleRemove = (index) => remove(index);
  // end hook form

  // calculation
  const watchValue = useWatch({ control, name: 'conveyanceDetails' });
  const totalAmount = totalSum(watchValue || [], 'amount');
  // end calculation

  const dispatch = useDispatch();
  const [updateConveyance] = useUpdateConveyanceMutation();

  const onSubmit = async (data) => {
    const newData = {
      date: date,
      amount: totalAmount,
      remarks: data?.remarks || '',
      conveyanceDetails: data?.conveyanceDetails?.map((el) => ({
        itemTypeId: el.itemType?.id,
        from: el.from,
        to: el.to,
        distance: el.distance || 0,
        vehicleTypeId: el.vehicleType?.id,
        details: el.details || '',
        amount: el.amount,
        remarks: el.remarks || '',
      })),
    };
    try {
      setLoading(true);
      const res = await updateConveyance({
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
            Edit Conveyance
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        {/* popup items */}

        {/* end popup items */}
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      size="small"
                      autoComplete="off"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                label="Remarks"
                {...register('remarks')}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ overflow: 'auto' }}>
                <Table sx={{ minWidth: 500 }}>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="center" colSpan={8}>
                        Conveyance Details
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((el, index) => (
                      <ConveyanceFields
                        key={el.id}
                        field={el}
                        index={index}
                        control={control}
                        handleRemove={handleRemove}
                        register={register}
                        allItemTypes={allItemTypes}
                        allVehicleTypes={allVehicleTypes}
                        allLocations={allLocations}
                        defaultValue={defaultValue}
                        setValue={setValue}
                      />
                    ))}
                    <StyledTableRow>
                      <StyledTableCell sx={{ verticalAlign: 'top' }}>
                        <Tooltip title="Add Row">
                          <IconButton color="primary" onClick={handleAppend}>
                            <IconSquareRoundedPlusFilled size={20} />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>

                      {watchValue?.length ? (
                        <StyledTableCell
                          sx={{ fontSize: 12, fontWeight: 700 }}
                          align="right"
                          colSpan={5}
                        >
                          Total Amount: {totalAmount}
                        </StyledTableCell>
                      ) : null}
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="primary"
                loading={loading}
                loadingPosition="start"
                startIcon={<IconDeviceFloppy />}
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

export default UpdateConveyance;
