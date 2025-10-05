import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TablePagination } from '@mui/material';
import { salaryYear } from 'assets/data';
import { useGetMonthSalaryDetailsQuery } from 'store/api/monthSalaryDetail/monthSalaryDetailApi';
import LoadingPage from 'ui-component/LoadingPage';
import NotFoundEmployee from 'views/pages/Employees/NotFoundEmployee';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import MySalaryRow from './MySalaryRow';

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

const MySalaries = () => {
  const userData = useSelector(selectAuth);

  const { data: userEmpData, isLoading } = useGetSingleUserEmployeeQuery(
    userData.userName || '123',
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const employeeData = userEmpData?.data;

  const [year, setYear] = useState('');
  const [status, setStatus] = useState('');

  // filtering and pagination
  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // end pagination
  const query = {};
  query['officeId'] = employeeData?.officeId || '123123123';

  if (year) {
    query['year'] = year;
  }

  if (status) {
    query['isAccepted'] = status === 'Received' ? true : false;
  }

  const { data: salaryData } = useGetMonthSalaryDetailsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allSalaries = salaryData?.monthSalaryDetails || [];
  const meta = salaryData?.meta;

  if (isLoading && !employeeData) {
    return <LoadingPage />;
  }

  if (!employeeData && !isLoading) {
    return <NotFoundEmployee />;
  }

  return (
    <MainCard title={<span>My Salaries</span>}>
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          columnSpacing={1}
          rowSpacing={2}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-year-id">Year</InputLabel>
              <Select
                labelId="select-year-id"
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {salaryYear?.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-status-id">Status</InputLabel>
              <Select
                labelId="select-status-id"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Salary Date</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell align="right">Days of Month</StyledTableCell>
              <StyledTableCell align="right">Weekend</StyledTableCell>
              <StyledTableCell align="right">Present</StyledTableCell>
              <StyledTableCell align="right">Absent</StyledTableCell>
              <StyledTableCell align="right">Leave</StyledTableCell>
              <StyledTableCell align="right">Lt. Count</StyledTableCell>
              <StyledTableCell align="right">
                Salary &#40;TK&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Deduction &#40;TK&#41;
              </StyledTableCell>
              <StyledTableCell align="right">
                Receivable &#40;TK&#41;
              </StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allSalaries?.length ? (
              allSalaries?.map((el, index) => (
                <MySalaryRow key={index} sn={index + 1} data={el} />
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
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={meta?.total || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </MainCard>
  );
};

export default MySalaries;
