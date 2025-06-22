import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const ViewConveyanceMainRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.vehicleType?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.from}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.to}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.distance}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ViewConveyanceMainRow;
