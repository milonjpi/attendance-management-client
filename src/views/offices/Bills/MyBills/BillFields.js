import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const BillFields = ({
  field,
  index,
  control,
  handleRemove,
  register,
  allItems,
  allUom,
  allShops,
  itemType,
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ minWidth: 130, py: '12px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              defaultValue={field.item}
              size="small"
              options={allItems}
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
                return data;
              }}
            />
          )}
          name={`billDetails[${index}].item`}
          control={control}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: 0, py: '12px !important' }}>
        <TextField
          fullWidth
          sx={{ minWidth: 80 }}
          size="small"
          label="Details"
          {...register(`billDetails[${index}].details`)}
        />
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: 120, py: '12px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              defaultValue={field.shop}
              size="small"
              options={allShops}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Supplier"
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
          name={`billDetails[${index}].shop`}
          control={control}
        />
      </StyledTableCell>
      {itemType ? null : (
        <>
          <StyledTableCell sx={{ minWidth: 0, py: '12px !important' }}>
            <Controller
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  defaultValue={field.uom}
                  size="small"
                  options={allUom}
                  fullWidth
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(item, value) => item.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="UOM"
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
              name={`billDetails[${index}].uom`}
              control={control}
            />
          </StyledTableCell>
          <StyledTableCell sx={{ width: 100 }}>
            <TextField
              fullWidth
              size="small"
              required
              type="number"
              label="Quantity"
              InputProps={{ inputProps: { min: 0, step: '0.01' } }}
              name={`billDetails[${index}].quantity`}
              {...register(`billDetails[${index}].quantity`, {
                required: true,
                valueAsNumber: true,
              })}
            />
          </StyledTableCell>
        </>
      )}

      <StyledTableCell sx={{ width: 120 }}>
        <TextField
          fullWidth
          required
          size="small"
          type="number"
          label="Amount"
          InputProps={{ inputProps: { min: 0 } }}
          name={`billDetails[${index}].amount`}
          {...register(`billDetails[${index}].amount`, {
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

export default BillFields;
