import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import { Table, TableBody, TableHead } from '@mui/material';
import printLogo from 'assets/images/print_logo.png';
import PrintAllConveyanceRow from './PrintAllConveyanceRow';

const PrintAllConveyance = forwardRef(
  ({ allConveyances, startDate, endDate, totalAmount }, ref) => {
    let sn = 1;
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
                height: 22,
                paddingRight: 5,
              }}
            />
            <Typography
              sx={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              TBZ ENGINEERING
            </Typography>
          </Box>

          <Typography
            component="h6"
            sx={{ fontSize: 16, textAlign: 'center', fontWeight: 700 }}
          >
            CONVEYANCES
            <br />
            <span style={{ fontSize: 12 }}>
              {startDate && endDate ? (
                <span>
                  <em>{moment(startDate).format('DD/MM/YYYY')}</em>
                  {' to '}
                  <em>{moment(endDate).format('DD/MM/YYYY')}</em>
                </span>
              ) : (
                ''
              )}
            </span>
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
              <StyledTableCellWithBorder align="center" colSpan={3}>
                Conveyance Details
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
                  colSpan={6}
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
