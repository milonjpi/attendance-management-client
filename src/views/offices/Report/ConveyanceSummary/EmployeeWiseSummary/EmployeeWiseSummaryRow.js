import { TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const EmployeeWiseSummaryRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.employee?.name}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default EmployeeWiseSummaryRow;
