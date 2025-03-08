import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import { getDaysInMonth } from 'views/utilities/NeedyFunction';
import moment from 'moment';
import { useGetAttendanceQuery } from 'store/api/attendance/attendanceApi';
import PresentManagementRow from './PresentManagementRow';
import CardAction from 'ui-component/cards/CardAction';
import AddIcon from '@mui/icons-material/Add';
import AddAttendance from './AddAttendance';
import { useGetEmployeesQuery } from 'store/api/employee/employeeApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ede7f6',
    color: '#5e35b1',
    padding: '7px 6px',
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    padding: '6px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const PresentManagement = () => {
  const [employee, setEmployee] = useState(null);

  const [open, setOpen] = useState(false);

  const [fromDate, setFromDate] = useState(
    new Date(currentYear, currentMonth, 1)
  );
  const [toDate, setToDate] = useState(
    new Date(
      currentYear,
      currentMonth,
      getDaysInMonth(currentMonth, currentYear)
    )
  );

  // library
  const empQuery = {};
  empQuery['limit'] = 100;
  empQuery['page'] = 0;
  empQuery['isActive'] = true;
  const { data: employeeData } = useGetEmployeesQuery({ ...empQuery });
  const employees = employeeData?.employees || [];

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

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;

  if (fromDate) {
    query['startDate'] = moment(fromDate).format('YYYY-MM-DD');
  }
  if (toDate) {
    query['endDate'] = moment(toDate).format('YYYY-MM-DD');
  }

  if (employee) {
    query['employeeId'] = employee.id;
  }

  const { data, isLoading } = useGetAttendanceQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const attendances = data?.attendances || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;

  return (
    <MainCard
      title="Present Management"
      secondary={
        <CardAction
          icon={<AddIcon />}
          title="Add"
          onClick={() => setOpen(true)}
        />
      }
    >
      {/* popup items */}
      <AddAttendance open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date From"
                inputFormat="DD/MM/YYYY"
                value={fromDate}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date To"
                inputFormat="DD/MM/YYYY"
                value={toDate}
                minDate={fromDate}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Autocomplete
              value={employee}
              fullWidth
              size="small"
              options={employees}
              getOptionLabel={(option) => option.officeId + ', ' + option.name}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setEmployee(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Employee" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>In Time</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {attendances?.length ? (
              attendances.map((item) => (
                <PresentManagementRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={10} sx={{ border: 0 }} align="center">
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
      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default PresentManagement;
