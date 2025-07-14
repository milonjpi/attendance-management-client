import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import { useGetItemsQuery } from 'store/api/item/itemApi';
import { useGetShopsQuery } from 'store/api/shop/shopApi';
import { useGetUomQuery } from 'store/api/uom/uomApi';
import { useUpdateBillMutation } from 'store/api/bill/billApi';
import BillFields from './BillFields';
import { useGetLocationsQuery } from 'store/api/location/locationApi';
import { Autocomplete } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 550, md: 850, lg: 950 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const defaultValue = {
  item: null,
  shop: null,
  details: '',
  uom: null,
  quantity: 1,
  amount: '',
};

const UpdateBill = ({ open, handleClose, preData }) => {
  const [loading, setLoading] = useState(false);
  const [itemType, setItemType] = useState(preData?.isService);
  const [location, setLocation] = useState(preData?.location || null);

  const [date, setDate] = useState(preData?.date);

  // library
  const { data: itemData } = useGetItemsQuery(
    {
      limit: 500,
      sortBy: 'label',
      sortOrder: 'asc',
      searchTerm: itemType === '' ? 'trueFalseTrueFalse' : '',
      isService: itemType ? true : false,
    },
    { refetchOnMountOrArgChange: true }
  );
  const allItems = itemData?.items || [];

  const { data: shopData } = useGetShopsQuery(
    { limit: 500, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );
  const allShops = shopData?.shops || [];

  const { data: uomData } = useGetUomQuery(
    {
      limit: 500,
      sortBy: 'label',
      sortOrder: 'asc',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allUom = uomData?.uom || [];
  const { data: locationData } = useGetLocationsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const allLocations = locationData?.locations || [];
  // end library

  // hook form
  const { register, handleSubmit, control } = useForm({
    defaultValues: preData,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'billDetails',
  });

  const handleAppend = () => {
    append(defaultValue);
  };
  const handleRemove = (index) => remove(index);
  // end hook form

  // calculation
  const watchValue = useWatch({ control, name: 'billDetails' });
  const totalAmount = totalSum(watchValue || [], 'amount');
  // end calculation

  const dispatch = useDispatch();
  const [updateBill] = useUpdateBillMutation();

  const onSubmit = async (data) => {
    const newData = {
      locationId: location?.id,
      date: date,
      amount: totalAmount,
      remarks: data?.remarks || '',
      billDetails: data?.billDetails?.map((el) => ({
        itemId: el.item?.id,
        shopId: el.shop?.id,
        details: el.details || '',
        uomId: el.uom?.id || null,
        quantity: el.quantity,
        amount: el.amount,
        remarks: el.remarks || '',
      })),
    };
    try {
      setLoading(true);
      const res = await updateBill({ id: preData?.id, body: newData }).unwrap();
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
            Edit Bill
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
            <Grid item xs={12} md={2.5}>
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
            <Grid item xs={12} md={2.5}>
              <FormControl fullWidth required size="small" disabled>
                <InputLabel id="select-item-type-id">Bill Type</InputLabel>
                <Select
                  labelId="select-item-type-id"
                  value={itemType}
                  label="Bill Type"
                  onChange={(e) => {
                    setItemType(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={false}>Product</MenuItem>
                  <MenuItem value={true}>Service</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {itemType ? (
              <Grid item xs={12} md={3}>
                <Autocomplete
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
            ) : null}

            <Grid item xs={12} md={itemType ? 4 : 7}>
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
                        Bill Details
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {fields.map((el, index) => (
                      <BillFields
                        key={el.id}
                        field={el}
                        index={index}
                        control={control}
                        handleRemove={handleRemove}
                        register={register}
                        allItems={allItems}
                        allShops={allShops}
                        allUom={allUom}
                        itemType={itemType}
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
                          colSpan={itemType ? 3 : 5}
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

export default UpdateBill;
