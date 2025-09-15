import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import printLogo from 'assets/images/print_logo.png';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { LinearProgress, Table, TableBody, TableHead } from '@mui/material';
import MonthSummaryRow from './MonthSummaryRow';

const PrintMonthSummary = forwardRef(
  ({ allExpenses, year, isLoading }, ref) => {
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 0.5,
            }}
          >
            <img
              src={printLogo}
              alt="G"
              style={{
                display: 'inline-block',
                height: 24,
                paddingRight: 5,
              }}
            />
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              TBZ ENGINEERING
            </Typography>
          </Box>
          <Typography
            component="h6"
            sx={{ fontSize: 15, textAlign: 'center', fontWeight: 500 }}
          >
            MONTHLY EXPENSE SUMMARY {year}
          </Typography>
        </Box>

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
                <MonthSummaryRow key={index} sn={index + 1} data={el} />
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
    );
  }
);

export default PrintMonthSummary;
