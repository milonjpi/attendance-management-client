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
import moment from 'moment';
import { Typography } from '@mui/material';

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
      countDiff,
      arrMonths,
      getStartMonth,
      getEndMonth,
      loading,
      location,
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
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {location
              ? location?.label + ', ' + location?.area?.label
              : 'All Branch'}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center" sx={{ width: 5 }}>
                SN
              </StyledTableCell>
              <StyledTableCell sx={{ width: 100 }}>Employee</StyledTableCell>
              <StyledTableCell colSpan={16}>Attendance</StyledTableCell>
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
            ) : data?.length ? (
              data.map((el, index) => (
                <AllAttendanceRow
                  key={index}
                  sn={index + 1}
                  data={el}
                  firstSlot={
                    countDiff > 15
                      ? arrMonths?.slice(0, Math.ceil(countDiff / 2))
                      : arrMonths
                  }
                  secondSlot={
                    countDiff > 15
                      ? arrMonths?.slice(
                          Math.ceil(countDiff / 2),
                          arrMonths?.length
                        )
                      : []
                  }
                />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={18} sx={{ border: 0 }} align="center">
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
