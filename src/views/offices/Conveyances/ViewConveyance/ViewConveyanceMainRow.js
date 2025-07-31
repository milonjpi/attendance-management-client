import { StyledTableCellWithNarrowBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const ViewConveyanceMainRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithNarrowBorder align="center">
        {sn}
      </StyledTableCellWithNarrowBorder>
      <StyledTableCellWithNarrowBorder sx={{ textTransform: 'uppercase' }}>
        {data?.itemType?.label}
      </StyledTableCellWithNarrowBorder>
      <StyledTableCellWithNarrowBorder>
        {data.itemType?.label?.toLowerCase() === 'transport' ? (
          <span>
            {data.from}
            <em> to </em>
            {data.to}
            <em> by </em>
            {data.vehicleType?.label} &#40;
            {data.distance} km&#41;
          </span>
        ) : (
          data.details
        )}
      </StyledTableCellWithNarrowBorder>
      <StyledTableCellWithNarrowBorder align="right">
        {data?.amount}
      </StyledTableCellWithNarrowBorder>
    </TableRow>
  );
};

export default ViewConveyanceMainRow;
