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
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import moment from 'moment';
import CardAction from 'ui-component/cards/CardAction';
import AddIcon from '@mui/icons-material/Add';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { useGetLeavesQuery } from 'store/api/leave/leaveApi';
import LoadingPage from 'ui-component/LoadingPage';
import NotFoundEmployee from 'views/pages/Employees/NotFoundEmployee';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import AddMyLeave from './AddMyLeave';
import MyLeaveRow from './MyLeaveRow';

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

const MyLeaves = () => {
  const userData = useSelector(selectAuth);

  const { data: userEmpData, isLoading: userEmpLoading } =
    useGetSingleUserEmployeeQuery(userData.userName || '123', {
      refetchOnMountOrArgChange: true,
    });
  const employeeData = userEmpData?.data;

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const [open, setOpen] = useState(false);

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
  query['officeId'] = employeeData?.officeId || '123';

  if (fromDate) {
    query['startDate'] = moment(fromDate).format('YYYY-MM-DD');
  }

  if (toDate) {
    query['endDate'] = moment(toDate).format('YYYY-MM-DD');
  }

  const { data, isLoading } = useGetLeavesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allLeaves = data?.leaves || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;

  if (userEmpLoading && !employeeData) {
    return <LoadingPage />;
  }

  if (!employeeData && !userEmpLoading) {
    return <NotFoundEmployee />;
  }

  return (
    <MainCard
      title="My Leaves"
      secondary={
        <CardAction
          icon={<AddIcon />}
          title="Add"
          onClick={() => setOpen(true)}
        />
      }
    >
      {/* popup items */}
      <AddMyLeave
        open={open}
        handleClose={() => setOpen(false)}
        employeeData={employeeData}
      />
      {/* end popup items */}
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
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
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
                <MyLeaveRow key={item.id} sn={sn++} data={item} />
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

export default MyLeaves;
