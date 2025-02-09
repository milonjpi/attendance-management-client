import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
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
import moment from 'moment';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconButton, Tooltip } from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';
import { allMonths } from 'assets/data';
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
  const [startDate, setStartDate] = useState(
    new Date(currentYear, currentMonth, 1)
  );
  const [endDate, setEndDate] = useState(moment());

  const getStartMonth = new Date(moment(startDate)).getMonth();
  const getEndMonth = new Date(moment(endDate)).getMonth();

  const startCount = startDate ? new Date(moment(startDate)).getDate() - 1 : 0;
  const endCount = endDate ? new Date(moment(endDate)).getDate() : 0;
  const countDiff = endCount - startCount;

  // selected month year
  const selectedMonth = new Date(
    moment(startDate).format('YYYY-MM-DD')
  ).getMonth();
  const selectedYear = new Date(
    moment(endDate).format('YYYY-MM-DD')
  ).getFullYear();
  const arrMonths = allMonths
    .slice(startCount, endCount)
    .map((el) =>
      moment(new Date(`${selectedYear}-${selectedMonth + 1}/${el}`)).format(
        'DD/MM/YYYY'
      )
    );

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

  // filtering and pagination
  const query = {};

  query['limit'] = 100;
  query['page'] = 0;
  query['isActive'] = true;

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
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

  // handle print
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
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={15} sm={7.5} md={5} lg={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date To"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                  />
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
          data={employees}
          startDate={startDate}
          endDate={endDate}
          countDiff={countDiff}
          arrMonths={arrMonths}
          getStartMonth={getStartMonth}
          getEndMonth={getEndMonth}
          loading={isLoading}
        />
      </Box>
      {/* end popup item */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 950 }}>
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
            ) : employees?.length ? (
              employees.map((el, index) => (
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
    </MainCard>
  );
};

export default AllAttendance;
