import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useState } from 'react';
const px = '3px !important';
const py = '12px !important';

const ConveyanceFields = ({
  field,
  index,
  control,
  handleRemove,
  register,
  allItemTypes,
  allVehicleTypes,
  allLocations,
  defaultValue,
  setValue,
}) => {
  const [itemType, setItemType] = useState(field?.itemType || null);
  return (
    <StyledTableRow>
      <StyledTableCell
        sx={{
          width: 150,
          py: py,
          px: px,
        }}
      >
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              defaultValue={itemType}
              size="small"
              options={allItemTypes}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Item"
                  variant="outlined"
                  required
                />
              )}
              onChange={(e, data) => {
                onChange(data);
                setItemType(data);
                setValue(`conveyanceDetails[${index}]`, {
                  ...defaultValue,
                  itemType: data,
                });
                return data;
              }}
            />
          )}
          name={`conveyanceDetails[${index}].itemType`}
          control={control}
        />
      </StyledTableCell>
      {itemType && itemType?.label?.toLowerCase() === 'transport' ? (
        <>
          <StyledTableCell sx={{ py: py, px: px }}>
            <Controller
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  defaultValue={field?.from || null}
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
                    onChange(data);
                    return data;
                  }}
                  onInputChange={(e, newValue) => {
                    onChange(newValue || null);
                    return newValue || null;
                  }}
                />
              )}
              name={`conveyanceDetails[${index}].from`}
              control={control}
            />
          </StyledTableCell>
          <StyledTableCell sx={{ py: py, px: px }}>
            <Controller
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  defaultValue={field?.to || null}
                  size="small"
                  options={allLocations}
                  fullWidth
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="To"
                      variant="outlined"
                      required
                    />
                  )}
                  onChange={(e, data) => {
                    onChange(data);
                    return data;
                  }}
                  onInputChange={(e, newValue) => {
                    onChange(newValue || null);
                    return newValue || null;
                  }}
                />
              )}
              name={`conveyanceDetails[${index}].to`}
              control={control}
            />
          </StyledTableCell>
          <StyledTableCell sx={{ py: py, px: px, width: 100 }}>
            <TextField
              fullWidth
              required
              size="small"
              type="number"
              label="Distance"
              InputProps={{ inputProps: { min: 0, step: '0.1' } }}
              name={`conveyanceDetails[${index}].distance`}
              {...register(`conveyanceDetails[${index}].distance`, {
                valueAsNumber: true,
                required: true,
              })}
            />
          </StyledTableCell>
          <StyledTableCell sx={{ py: py, px: px, width: 130 }}>
            <Controller
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  defaultValue={field?.vehicleType || null}
                  size="small"
                  options={allVehicleTypes}
                  fullWidth
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vehicle"
                      variant="outlined"
                      required
                    />
                  )}
                  onChange={(e, data) => {
                    onChange(data);
                    return data;
                  }}
                />
              )}
              name={`conveyanceDetails[${index}].vehicleType`}
              control={control}
            />
          </StyledTableCell>
          <StyledTableCell sx={{ width: 120, py: py, px: px }}>
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
        </>
      ) : null}

      {itemType && itemType?.label?.toLowerCase() !== 'transport' ? (
        <>
          <StyledTableCell sx={{ minWidth: 0, py: py, px: px }} colSpan={4}>
            <TextField
              required
              fullWidth
              sx={{ minWidth: 80 }}
              size="small"
              label="Details"
              {...register(`conveyanceDetails[${index}].details`, {
                required: true,
              })}
            />
          </StyledTableCell>{' '}
          <StyledTableCell sx={{ width: 120, py: py, px: px }}>
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
        </>
      ) : null}

      {!itemType ? <StyledTableCell colSpan={5}></StyledTableCell> : null}

      <StyledTableCell
        align="right"
        sx={{ py: py, px: px, width: itemType && 30 }}
      >
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
