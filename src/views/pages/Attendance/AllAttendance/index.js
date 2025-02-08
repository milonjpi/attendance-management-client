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
import AllAttendanceRow from './AllAttendanceRow';
import { getDaysInMonth } from 'views/utilities/NeedyFunction';
import moment from 'moment';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconButton, Tooltip } from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';
import PrintAllAttendance from './PrintAllAttendance';

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

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const AllAttendance = () => {
  const [designation, setDesignation] = useState(null);
  const [department, setDepartment] = useState(null);
  const [location, setLocation] = useState(null);

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
  const isDisable = (date) => {
    const month = date.month();
    return month !== new Date(fromDate).getMonth();
  };

  const startDate = fromDate ? new Date(moment(fromDate)).getDate() - 1 : 0;
  const endDate = toDate ? new Date(moment(toDate)).getDate() : 0;

  const getStartMonth = new Date(moment(fromDate)).getMonth();
  const getEndMonth = new Date(moment(toDate)).getMonth();

  // library

  const { data: designationData } = useGetDesignationsQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const { data: departmentData } = useGetDepartmentsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const { data: locationData } = useGetLocationsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const allDesignations = designationData?.data || [];
  const allDepartments = departmentData?.data || [];
  const allLocations = locationData?.data || [];

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
  query['isActive'] = true;

  if (fromDate) {
    query['startDate'] = moment(fromDate).format('YYYY-MM-DD');
  }
  if (toDate) {
    query['endDate'] = moment(toDate).format('YYYY-MM-DD');
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
      title="All Attendance"
      secondary={
        <Tooltip title="Print">
          <IconButton size="small" color="secondary" onClick={handlePrint}>
            <IconPrinter size={20} />
          </IconButton>
        </Tooltip>
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }} columns={15}>
          <Grid item xs={15} sm={7.5} md={5} lg={3}>
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
          <Grid item xs={15} sm={7.5} md={5} lg={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date To"
                inputFormat="DD/MM/YYYY"
                value={toDate}
                minDate={fromDate}
                shouldDisableDate={isDisable}
                onChange={(newValue) => {
                  setToDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={15} sm={7.5} md={5} lg={3}>
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
          <Grid item xs={15} sm={7.5} md={5} lg={3}>
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
          <Grid item xs={15} sm={7.5} md={5} lg={3}>
            <Autocomplete
              value={location}
              fullWidth
              size="small"
              options={allLocations}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setLocation(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Location" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintAllAttendance
          ref={componentRef}
          data={printEmployees}
          startDate={startDate}
          endDate={endDate}
          fromDate={fromDate}
          toDate={toDate}
          getStartMonth={getStartMonth}
          getEndMonth={getEndMonth}
          loading={printLoading}
        />
      </Box>
      {/* end popup item */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 700 }}>
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
            ) : employees?.length ? (
              employees.map((item) => (
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

export default AllAttendance;
