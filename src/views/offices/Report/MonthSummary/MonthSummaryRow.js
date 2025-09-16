import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import { totalSum } from 'views/utilities/NeedyFunction';

const MonthSummaryRow = ({ sn, data }) => {
  const locations = data?.locations || [];
  const rowSpan = locations.length || 1;
  const totalMonthExpense = totalSum(locations, 'totalExpenses');
  return (
    <>
      {/* Main Row */}
      <TableRow>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          {sn}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.month}
        </StyledTableCellWithBorder>
        {/* First row includes totals and actions */}
        {locations.length > 0 && (
          <>
            <StyledTableCellWithBorder>
              {locations[0].location?.label}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {locations[0].salaries}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {locations[0].conveyances}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {locations[0].bills}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {locations[0].totalExpenses}
            </StyledTableCellWithBorder>
          </>
        )}
        <StyledTableCellWithBorder align="right" rowSpan={rowSpan}>
          {totalMonthExpense}
        </StyledTableCellWithBorder>
      </TableRow>

      {/* Remaining Income Details Rows */}
      {locations.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder>
            {el.location?.label}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.salaries}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.conveyances}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.bills}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.totalExpenses}
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default MonthSummaryRow;
