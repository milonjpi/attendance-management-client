import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import AllAttendanceRow from './AllAttendanceRow';

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

const PrintAllAttendance = forwardRef(
  (
    {
      data,
      startDate,
      endDate,
      fromDate,
      toDate,
      getStartMonth,
      getEndMonth,
      loading,
    },
    ref
  ) => {
    let sn = 1;
    return (
      <Box component="div" ref={ref}>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center" sx={{ width: 5 }}>
                SN
              </StyledTableCell>
              <StyledTableCell sx={{ width: 100 }}>Employee</StyledTableCell>
              <StyledTableCell>Attendance</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {startDate >= endDate || getStartMonth !== getEndMonth ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={3}
                  align="center"
                  sx={{ color: 'red' }}
                >
                  Invalid Date Range !!!
                </StyledTableCell>
              </StyledTableRow>
            ) : data?.length ? (
              data.map((item) => (
                <AllAttendanceRow
                  key={item.id}
                  sn={sn++}
                  data={item}
                  fromDate={fromDate}
                  toDate={toDate}
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
  }
);

export default PrintAllAttendance;
