import { TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const ExpenseSummaryRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.location?.label + ', ' + data?.location?.area?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.salaries}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.conveyances}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.bills}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.totalExpenses}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default ExpenseSummaryRow;
