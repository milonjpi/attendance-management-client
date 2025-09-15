import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { Box, LinearProgress } from '@mui/material';
import { useGetExpenseSummaryMonthQuery } from 'store/api/report/reportApi';
import MonthlyExpenseSummaryRow from './MonthlyExpenseSummaryRow';

const MonthlyExpenseSummary = ({ userData, employeeData, year }) => {
  // filtering and pagination
  const query = {};

  query['year'] = year;
  query['locationId'] = employeeData?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  const { data, isLoading } = useGetExpenseSummaryMonthQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];
  return (
    <MainCard
      title={`Monthly Summary ${year}`}
      headerX={{ px: 2 }}
      contentSX={{ px: 2 }}
    >
      {/* data table */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Month</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Branch</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Salary
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Conveyance
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Bill
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Total Expenses
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExpenses?.length ? (
              allExpenses?.map((el, index) => (
                <MonthlyExpenseSummaryRow
                  key={el.id}
                  sn={index + 1}
                  data={el}
                />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder colSpan={15} align="center">
                  {isLoading ? (
                    <LinearProgress
                      color="primary"
                      sx={{ opacity: 0.5, py: 0.5 }}
                    />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCellWithBorder>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* end data table */}
    </MainCard>
  );
};

export default MonthlyExpenseSummary;
