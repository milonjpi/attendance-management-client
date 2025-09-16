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
import {
  useGetEmployeesQuery,
  useGetSingleUserEmployeeQuery,
} from 'store/api/employee/employeeApi';
import { useGetLeavesQuery } from 'store/api/leave/leaveApi';
import { useGetLocationsQuery } from 'store/api/location/locationApi';
import PendingLeavesRow from './PendingLeavesRow';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';

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

const PendingLeaves = () => {
  const userData = useSelector(selectAuth);
  // employee data
  const { data: userEmpData } = useGetSingleUserEmployeeQuery(
    userData.userName || '123',
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
    }
  );
  const userEmployee = userEmpData?.data;

  const [location, setLocation] = useState(null);
  const [employee, setEmployee] = useState(null);

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
  const { data: locationData } = useGetLocationsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allLocations = locationData?.locations || [];
  // employee
  const empQuery = {};
  empQuery['limit'] = 100;
  empQuery['page'] = 0;
  empQuery['isActive'] = true;
  empQuery['isOwn'] = false;
  empQuery['locationId'] = userEmployee?.locationId;

  if (userData?.role === 'super_admin') {
    delete empQuery.locationId;
  }

  if (location) {
    empQuery['locationId'] = location?.id;
  }

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
  query['status'] = 'Pending';
  query['locationId'] = userEmployee?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  if (fromDate) {
    query['startDate'] = moment(fromDate).format('YYYY-MM-DD');
  }

  if (toDate) {
    query['endDate'] = moment(toDate).format('YYYY-MM-DD');
  }

  if (location) {
    query['locationId'] = location.id;
  }

  if (employee) {
    query['officeId'] = employee.officeId;
  }

  const { data, isLoading } = useGetLeavesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allLeaves = data?.leaves || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;

  return (
    <MainCard title="Pending Leaves">
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          columnSpacing={1}
          rowSpacing={2}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} sm={6} md={2.5}>
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
          <Grid item xs={12} sm={6} md={2.5}>
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
          {userData?.role === 'super_admin' ? (
            <Grid item xs={12} md={3.5}>
              <Autocomplete
                value={location}
                fullWidth
                size="small"
                options={allLocations}
                getOptionLabel={(option) =>
                  option.label + ', ' + option.area?.label
                }
                isOptionEqualToValue={(item, value) => item.id === value.id}
                onChange={(e, newValue) => setLocation(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Branch" />
                )}
              />
            </Grid>
          ) : null}

          <Grid item xs={12} md={3.5}>
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
              <StyledTableCell>Employee</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell>Date &#40;From&#41;</StyledTableCell>
              <StyledTableCell>Date &#40;To&#41;</StyledTableCell>
              <StyledTableCell align="center">Days</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allLeaves?.length ? (
              allLeaves.map((item) => (
                <PendingLeavesRow
                  key={item.id}
                  sn={sn++}
                  data={item}
                  userEmployee={userEmployee}
                />
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

export default PendingLeaves;
