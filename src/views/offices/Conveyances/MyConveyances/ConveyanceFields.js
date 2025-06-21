import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useState } from 'react';
import { useGetConveyanceLocationsQuery } from 'store/api/conveyance/conveyanceApi';

const ConveyanceFields = ({
  field,
  index,
  control,
  handleRemove,
  register,
  allItemTypes,
  allVehicleTypes,
}) => {
  const [itemType, setItemType] = useState(field?.itemType || null);
  const [from, setFrom] = useState(field?.from || null);
  const [to, setTo] = useState(field?.to || null);
  const [vehicleType, setVehicleType] = useState(field?.vehicleType || null);

  const { data: locationData } = useGetConveyanceLocationsQuery(
    { type: itemType?.label || 'Transport' },
    { refetchOnMountOrArgChange: true }
  );
  const allLocations = locationData?.locations || [];
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ minWidth: 130, py: '12px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={itemType}
              size="small"
              options={allItemTypes}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Category"
                  variant="outlined"
                  required
                />
              )}
              onChange={(e, data) => {
                setItemType(data);
                setFrom(null);
                setTo(null);
                setVehicleType(null);
                onChange(data);
                return data;
              }}
            />
          )}
          name={`conveyanceDetails[${index}].itemType`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: 0, py: '12px !important' }}>
        <TextField
          fullWidth
          sx={{ minWidth: 80 }}
          size="small"
          label="Details"
          {...register(`conveyanceDetails[${index}].details`)}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: 120, py: '12px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={from}
              size="small"
              options={allLocations}
              fullWidth
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  variant="outlined"
                  required
                />
              )}
              onChange={(e, data) => {
                setFrom(data);
                onChange(data);
                return data;
              }}
            />
          )}
          name={`conveyanceDetails[${index}].from`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: 120, py: '12px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={to}
              size="small"
              options={allLocations}
              fullWidth
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="To" variant="outlined" required />
              )}
              onChange={(e, data) => {
                setTo(data);
                onChange(data);
                return data;
              }}
            />
          )}
          name={`conveyanceDetails[${index}].to`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: 0, py: '12px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={vehicleType}
              size="small"
              options={allVehicleTypes}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="By" variant="outlined" required />
              )}
              onChange={(e, data) => {
                setVehicleType(data);
                onChange(data);
                return data;
              }}
            />
          )}
          name={`conveyanceDetails[${index}].vehicleType`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ width: 120 }}>
        <TextField
          fullWidth
          required
          size="small"
          type="number"
          label="Amount"
          InputProps={{ inputProps: { min: 0 } }}
          name={`conveyanceDetails[${index}].amount`}
          {...register(`conveyanceDetails[${index}].amount`, {
            valueAsNumber: true,
            required: true,
          })}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="Remove Row">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleRemove(index)}
          >
            <IconSquareRoundedXFilled size={20} />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ConveyanceFields;
