import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import { mainStatus } from 'assets/data';
import { IconPlus } from '@tabler/icons-react';
import CardAction from 'ui-component/cards/CardAction';
import moment from 'moment';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import SearchIcon from '@mui/icons-material/Search';
import {
  InputAdornment,
  InputBase,
  LinearProgress,
  Table,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useDebounced } from 'hooks';
import { useGetBillsQuery } from 'store/api/bill/billApi';
import { useSelector } from 'react-redux';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { selectAuth } from 'store/authSlice';
import LoadingPage from 'ui-component/LoadingPage';
import NotFoundEmployee from 'views/pages/Employees/NotFoundEmployee';
import AddBill from './AddBill';
import BillRow from './BillRow';

const MyBills = () => {
  const userData = useSelector(selectAuth);

  const { data: userEmpData, isLoading: userEmpLoading } =
    useGetSingleUserEmployeeQuery(userData.userName || '123', {
      refetchOnMountOrArgChange: true,
    });
  const employeeData = userEmpData?.data;

  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('all');

  const [open, setOpen] = useState(false);

  // table
  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // end pagination
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'date';
  query['sortOrder'] = 'desc';
  query['officeId'] = employeeData?.officeId || '123';

  if (status !== 'all') {
    query['status'] = status;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }

  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetBillsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allBills = data?.bills || [];
  const meta = data?.meta;

  const quantity = data?.sum?._sum?.quantity;
  const totalAmount = data?.sum?._sum?.amount;
  const totalPaidAmount = data?.sum?._sum?.paidAmount;

  let sn = page * rowsPerPage + 1;

  // loading and not found
  if (userEmpLoading && !employeeData) {
    return <LoadingPage />;
  }

  // if (!employeeData && !userEmpLoading) {
  //   return <NotFoundEmployee />;
  // }
  return (
    <MainCard
      title="My Bills"
      secondary={
        <CardAction
          title="Create Bill"
          icon={<IconPlus />}
          onClick={() => setOpen(true)}
        />
      }
    >
      {/* pop up items */}
      <AddBill
        open={open}
        handleClose={() => setOpen(false)}
        employeeData={employeeData}
      />
      {/* pop up items */}
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3}>
            <InputBase
              fullWidth
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ borderBottom: '1px solid #ccc' }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date (From)"
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
          <Grid item xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date (To)"
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="expense-status-id">Status</InputLabel>
              <Select
                labelId="expense-status-id"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="all">
                  <em>All</em>
                </MenuItem>
                {mainStatus?.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCellWithBorder align="center" rowSpan={2}>
              SN
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              Date
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" colSpan={5}>
              Bill Details
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right" rowSpan={2}>
              Amount
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" rowSpan={2}>
              Status
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" rowSpan={2}>
              Action
            </StyledTableCellWithBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithBorder>Item</StyledTableCellWithBorder>
            <StyledTableCellWithBorder>Details</StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center">
              UOM
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              Quantity
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              Price
            </StyledTableCellWithBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          {allBills?.length ? (
            allBills?.map((el, index) => (
              <BillRow key={index} sn={sn++} data={el} />
            ))
          ) : (
            <TableRow>
              <StyledTableCellWithBorder colSpan={15} align="center">
                {isLoading ? (
                  <LinearProgress
                    color="primary"
                    sx={{ opacity: 0.5, py: 0.5 }}
                  />
                ) : (
                  'No Data'
                )}
              </StyledTableCellWithBorder>
            </TableRow>
          )}
          {allBills?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={7}
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                TOTAL
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {totalAmount}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
                colSpan={2}
              ></StyledTableCellWithBorder>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40, 100]}
        component="div"
        count={meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* end data table */}
    </MainCard>
  );
};

export default MyBills;
