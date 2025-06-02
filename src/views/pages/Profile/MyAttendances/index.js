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
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import { useGetAllReportQuery } from 'store/api/report/reportApi';
import moment from 'moment';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconButton, Tooltip } from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';
import LoadingPage from 'ui-component/LoadingPage';
import NotFoundEmployee from 'views/pages/Employees/NotFoundEmployee';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import PrintEmployeeAttendance from 'views/pages/Employees/ActiveEmployees/SingleActiveEmployee/EmployeeAttendance/PrintEmployeeAttendance';
import EmployeeAttendanceRow from 'views/pages/Employees/ActiveEmployees/SingleActiveEmployee/EmployeeAttendance/EmployeeAttendanceRow';

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

const MyAttendances = () => {
  const userData = useSelector(selectAuth);
  const { data: userEmpData, isLoading: userEmpLoading } =
    useGetSingleUserEmployeeQuery(userData.userName || '123', {
      refetchOnMountOrArgChange: true,
    });
  const employeeData = userEmpData?.data;

  const [startDate, setStartDate] = useState(
    new Date(currentYear, currentMonth, 1)
  );
  const [endDate, setEndDate] = useState(moment());

  const getStartMonth = new Date(moment(startDate)).getMonth();
  const getEndMonth = new Date(moment(endDate)).getMonth();

  // filtering and pagination
  const query = {};

  query['limit'] = 100;
  query['page'] = 0;
  query['employeeId'] = employeeData?.id || '123';

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  const { data, isLoading } = useGetAllReportQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const employees = data?.employees || [];
  const attendanceDetails = employees[0]?.attendances || [];

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

  if (userEmpLoading && !employeeData) {
    return <LoadingPage />;
  }

  if (!employeeData && !userEmpLoading) {
    return <NotFoundEmployee />;
  }

  return (
    <MainCard
      title="My Attendances"
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
          <Grid item xs={12} sm={6} md={3}>
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
        </Grid>
      </Box>
      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintEmployeeAttendance
          ref={componentRef}
          attendanceDetails={attendanceDetails}
          employeeData={employeeData}
          startDate={startDate}
          endDate={endDate}
          isLoading={isLoading}
          getStartMonth={getStartMonth}
          getEndMonth={getEndMonth}
        />
      </Box>
      {/* end popup item */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 950 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center" sx={{ width: 50 }}>
                SN
              </StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
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
    </MainCard>
  );
};

export default MyAttendances;
