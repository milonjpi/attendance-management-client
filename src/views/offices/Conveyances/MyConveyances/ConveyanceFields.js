import Autocomplete from '@mui/material/Autocomplete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { IconSquareRoundedXFilled } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';


const ConveyanceFields = ({
  field,
  index,
  control,
  handleRemove,
  register,
  allItemTypes,
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ minWidth: 130, py: '12px !important' }}>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              defaultValue={field?.itemType || null}
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
