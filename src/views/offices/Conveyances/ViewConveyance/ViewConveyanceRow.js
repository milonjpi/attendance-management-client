import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';

const ViewConveyanceRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.itemType?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>{data?.details}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ViewConveyanceRow;
