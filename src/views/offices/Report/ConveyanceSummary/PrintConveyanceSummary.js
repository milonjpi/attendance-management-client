import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import printLogo from 'assets/images/print_logo.png';
import { Empty, StyledTableCellWithBorder } from 'ui-component/table-component';
import { LinearProgress, Table, TableBody, TableHead } from '@mui/material';
import ConveyanceSummaryRow from './ConveyanceSummaryRow';

const PrintConveyanceSummary = forwardRef(
  ({ allExpenses, year, month, totalConveyances, isLoading }, ref) => {
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
            CONVEYANCE SUMMARY{' '}
            {year && month
              ? `of ${month}, ${year}`
              : year
              ? `of ${year}`
              : null}
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow className="row">
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>BRANCH</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                CONVEYANCES AMOUNT
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExpenses?.length ? (
              allExpenses?.map((el, index) => (
                <ConveyanceSummaryRow key={index} sn={index + 1} data={el} />
              ))
            ) : (
              <TableRow className="row">
                <StyledTableCellWithBorder colSpan={15}>
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    <Empty />
                  )}
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allExpenses?.length ? (
              <TableRow>
                <StyledTableCellWithBorder colSpan={2} sx={{ fontWeight: 700 }}>
                  TOTAL
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {totalConveyances}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);

export default PrintConveyanceSummary;
