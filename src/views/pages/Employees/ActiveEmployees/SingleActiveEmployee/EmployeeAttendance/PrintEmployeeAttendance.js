import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import moment from 'moment';
import { Typography } from '@mui/material';
import EmployeeAttendanceRow from './EmployeeAttendanceRow';

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

const PrintEmployeeAttendance = forwardRef(
  (
    {
      attendanceDetails,
      employeeData,
      startDate,
      endDate,
      isLoading,
      getStartMonth,
      getEndMonth,
    },
    ref
  ) => {
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            {employeeData?.name}
          </Typography>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 500,
              fontSize: 11,
              textAlign: 'center',
              mb: 0.5,
            }}
          >
            {employeeData?.designation?.label +
              ', ' +
              employeeData?.department?.label}
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              textAlign: 'center',
            }}
          >
            {moment(startDate).format('DD/MM/YYYY') +
              ' to ' +
              moment(endDate).format('DD/MM/YYYY')}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center" sx={{ width: 50 }}>
                SN
              </StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Additional Notes</StyledTableCell>
              <StyledTableCell align="center">In Time</StyledTableCell>
              <StyledTableCell align="center">Out Time</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {!startDate ||
            !endDate ||
            Number(moment(startDate).format('YYYYMMDD')) >
              Number(moment(endDate).format('YYYYMMDD')) ||
            getStartMonth !== getEndMonth ? (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={18}
                  align="center"
                  sx={{ color: 'red' }}
                >
                  Invalid Date Range !!!
                </StyledTableCell>
              </StyledTableRow>
            ) : attendanceDetails?.length ? (
              attendanceDetails.map((el, index) => (
                <EmployeeAttendanceRow key={index} sn={index + 1} data={el} />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={18} sx={{ border: 0 }} align="center">
                  {isLoading ? (
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

export default PrintEmployeeAttendance;
