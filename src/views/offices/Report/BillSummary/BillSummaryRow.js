import { TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const BillSummaryRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.location?.label + ', ' + data?.location?.area?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.bills}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default BillSummaryRow;
