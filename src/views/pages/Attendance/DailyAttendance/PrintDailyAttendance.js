import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import DailyAttendanceRow from './DailyAttendanceRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ede7f6',
    color: '#5e35b1',
    padding: '7px 6px',
    fontSize: 10,
    border: '1px solid #999999',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: '6px',
    border: '1px solid #999999',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

const PrintDailyAttendance = forwardRef(({ data, date, loading }, ref) => {
  let sn = 1;
  return (
    <Box component="div" ref={ref}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center">SN</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Designation</StyledTableCell>
            <StyledTableCell>Department</StyledTableCell>
            <StyledTableCell>Location</StyledTableCell>
            <StyledTableCell>In Time</StyledTableCell>
            <StyledTableCell>Out Time</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {!date?.isValid() ? (
            <StyledTableRow>
              <StyledTableCell
                colSpan={10}
                align="center"
                sx={{ color: 'red' }}
              >
                Invalid Date !!!
              </StyledTableCell>
            </StyledTableRow>
          ) : data?.length ? (
            data.map((item) => (
              <DailyAttendanceRow
                key={item.id}
                sn={sn++}
                data={item}
                date={date}
              />
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={10} sx={{ border: 0 }} align="center">
                {loading ? (
                  <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                ) : (
                  'No Data'
                )}
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
});

export default PrintDailyAttendance;
