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
import { useGetDesignationsQuery } from 'store/api/designation/designationApi';
import { useGetDepartmentsQuery } from 'store/api/department/departmentApi';
import { useGetLocationsQuery } from 'store/api/location/locationApi';
import { useGetAllReportQuery } from 'store/api/report/reportApi';
import moment from 'moment';
import DailyAttendanceRow from './DailyAttendanceRow';
import { IconButton, Tooltip } from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';
import PrintDailyAttendance from './PrintDailyAttendance';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';

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

const DailyAttendance = () => {
  const userData = useSelector(selectAuth);
  // employee data
  const { data: userEmpData } = useGetSingleUserEmployeeQuery(
    userData.userName || '123',
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
    }
  );
  const employeeData = userEmpData?.data;

  const [designation, setDesignation] = useState(null);
  const [department, setDepartment] = useState(null);
  const [location, setLocation] = useState(null);

  const [date, setDate] = useState(moment());

  // library

  const { data: designationData } = useGetDesignationsQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const { data: departmentData } = useGetDepartmentsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const { data: locationData } = useGetLocationsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allDesignations = designationData?.data || [];
  const allDepartments = departmentData?.data || [];
  const allLocations = locationData?.locations || [];

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
  query['sortBy'] = 'officeId';
  query['sortOrder'] = 'asc';
  query['isActive'] = true;
  query['isOwn'] = false;
  query['locationId'] = employeeData?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  if (date) {
    query['startDate'] = moment(date).format('YYYY-MM-DD');
    query['endDate'] = moment(date).format('YYYY-MM-DD');
  }

  if (designation) {
    query['designationId'] = designation.id;
  }

  if (department) {
    query['departmentId'] = department.id;
  }

  if (location) {
    query['locationId'] = location.id;
  }

  const { data, isLoading } = useGetAllReportQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const employees = data?.employees || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;

  // handle print
  const { data: printData, isLoading: printLoading } = useGetAllReportQuery(
    { ...query, page: 0, limit: 100 },
    { refetchOnMountOrArgChange: true }
  );

  const printEmployees = printData?.employees || [];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
         @media print {
           .row {
             page-break-inside: avoid;
           }
         }
         `,
  });

  return (
    <MainCard
      title="Daily Attendance"
      secondary={
        <Tooltip title="Print">
          <IconButton size="small" color="secondary" onClick={handlePrint}>
            <IconPrinter size={20} />
          </IconButton>
        </Tooltip>
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          columnSpacing={1}
          rowSpacing={2}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Select Date"
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={2.7}>
            <Autocomplete
              value={designation}
              fullWidth
              size="small"
              options={allDesignations}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setDesignation(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Designation" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.8}>
            <Autocomplete
              value={department}
              fullWidth
              size="small"
              options={allDepartments}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setDepartment(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Department" />
              )}
            />
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
        </Grid>
      </Box>
      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintDailyAttendance
          ref={componentRef}
          data={printEmployees}
          date={date}
          loading={printLoading}
        />
      </Box>
      {/* end popup item */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
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
            ) : employees?.length ? (
              employees.map((item) => (
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

export default DailyAttendance;
