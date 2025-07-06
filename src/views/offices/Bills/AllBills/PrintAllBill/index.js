import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import { Table, TableBody, TableHead } from '@mui/material';
import PrintAllBillRow from './PrintAllBillRow';

const PrintAllBill = forwardRef(
  ({ allBills, startDate, endDate, totalAmount }, ref) => {
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
            BILLS{' '}
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
              <StyledTableCellWithBorder align="center" colSpan={5}>
                Bill Details
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right" rowSpan={2}>
                Amount
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="center" rowSpan={2}>
                Status
              </StyledTableCellWithBorder>
            </TableRow>
            <TableRow>
              <StyledTableCellWithBorder>Item</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Details</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="center">
                UOM
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Quantity
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Price
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBills?.length ? (
              allBills?.map((el, index) => (
                <PrintAllBillRow key={index} sn={sn++} data={el} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder colSpan={15} align="center">
                  No Data
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allBills?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={8}
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

export default PrintAllBill;
