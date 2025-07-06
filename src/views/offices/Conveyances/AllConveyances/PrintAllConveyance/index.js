import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import { Table, TableBody, TableHead } from '@mui/material';
import PrintAllConveyanceRow from './PrintAllConveyanceRow';

const PrintAllConveyance = forwardRef(
  ({ allConveyances, startDate, endDate, totalAmount }, ref) => {
    let sn = 1;
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            TBZ ENGINEERING
          </Typography>
          <Typography
            component="h6"
            sx={{ fontSize: 16, textAlign: 'center', fontWeight: 700 }}
          >
            CONVEYANCES{' '}
            {startDate && endDate ? (
              <span>
                {' '}
                <em>{moment(startDate).format('DD/MM/YYYY')}</em> to{' '}
                <em>{moment(endDate).format('DD/MM/YYYY')}</em>
              </span>
            ) : (
              ''
            )}
          </Typography>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center" rowSpan={2}>
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2}>
                Date
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2}>
                Employee
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2}>
                Destination
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2} align="right">
                Distance&#40;KM&#41;
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2} align="right">
                Cost&#40;TK&#41;
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="center" colSpan={3}>
                Additional Expenses
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right" rowSpan={2}>
                Total Amount
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="center" rowSpan={2}>
                Status
              </StyledTableCellWithBorder>
            </TableRow>
            <TableRow>
              <StyledTableCellWithBorder>Item</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Details</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Amount
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allConveyances?.length ? (
              allConveyances?.map((el, index) => (
                <PrintAllConveyanceRow key={index} sn={sn++} data={el} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder colSpan={15} align="center">
                  No Data
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allConveyances?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={9}
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  TOTAL
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  {totalAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                ></StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);
export default PrintAllConveyance;
