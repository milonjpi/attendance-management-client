import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import MonthlySalaryRow from './MonthlySalaryRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ede7f6',
    color: '#5e35b1',
    padding: '4px 3px',
    fontSize: 10,
    border: '1px solid #999999',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 10,
    padding: '3px',
    border: '1px solid #999999',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));

const PrintMonthlySalaries = forwardRef(
  ({ allSalaries, month, year, branch, isLoading }, ref) => {
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              fontSize: 18,
              textTransform: 'uppercase',
            }}
          >
            Monthly Salary of {month}, {year}
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              fontSize: 14,
              textTransform: 'uppercase',
            }}
          >
            Branch:{' '}
            {branch ? branch?.label + ', ' + branch?.area?.label : 'All Branch'}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Employee</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell align="right">Total Day</StyledTableCell>
              <StyledTableCell align="right">Weekend</StyledTableCell>
              <StyledTableCell align="right">Working Day</StyledTableCell>
              <StyledTableCell align="right">Presents</StyledTableCell>
              <StyledTableCell align="right">Leaves</StyledTableCell>
              <StyledTableCell align="right">Absent</StyledTableCell>
              <StyledTableCell align="right">
                Salary &#40;TK&#41;
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allSalaries?.length ? (
              allSalaries?.map((el, index) => (
                <MonthlySalaryRow key={index} sn={index + 1} data={el} />
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

export default PrintMonthlySalaries;
