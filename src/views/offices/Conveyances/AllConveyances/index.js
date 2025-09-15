import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import moment from 'moment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  IconButton,
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
import {
  useGetEmployeesQuery,
  useGetSingleUserEmployeeQuery,
} from 'store/api/employee/employeeApi';
import { useGetConveyancesQuery } from 'store/api/conveyance/conveyanceApi';
import { mainStatus } from 'assets/data';
import AllConveyanceRow from './AllConveyanceRow';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconPrinter } from '@tabler/icons';
import PrintAllConveyance from './PrintAllConveyance';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';

const AllConveyances = () => {
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

  const [searchText, setSearchText] = useState('');
  const [employee, setEmployee] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [status, setStatus] = useState('Approved');

  // library
  // employee
  const empQuery = {};
  empQuery['limit'] = 100;
  empQuery['page'] = 0;
  empQuery['sortBy'] = 'name';
  empQuery['sortOrder'] = 'asc';
  empQuery['isActive'] = true;
  empQuery['locationId'] = userEmployee?.locationId || '0';

  if (userData?.role === 'super_admin') {
    delete empQuery.locationId;
  }

  const { data: employeeData, isLoading: employeeLoading } =
    useGetEmployeesQuery({ ...empQuery });
  const allEmployees = employeeData?.employees || [];
  // end library

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
  query['locationId'] = userEmployee?.locationId || '0';

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  if (employee) {
    query['officeId'] = employee?.officeId;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }

  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  if (status !== 'all') {
    query['status'] = status;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetConveyancesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allConveyances = data?.conveyances || [];
  const meta = data?.meta;

  const totalAmount = data?.sum?._sum?.amount;

  let sn = page * rowsPerPage + 1;

  // print data fetching
  const { data: printData, isLoading: printDataLoading } =
    useGetConveyancesQuery(
      { ...query, page: 0, limit: 5000 },
      { refetchOnMountOrArgChange: true }
    );

  const allPrintConveyances = printData?.conveyances || [];
  const totalPrintAmount = printData?.sum?._sum?.amount;
  // handle print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
            @media print {
              .pageBreakRow {
                page-break-inside: avoid;
              }
            }
            `,
  });
  return (
    <MainCard
      title="All Conveyances"
      secondary={
        <IconButton
          disabled={printDataLoading}
          color="primary"
          onClick={handlePrint}
        >
          <IconPrinter size={20} />
        </IconButton>
      }
    >
      {/* pop up items */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintAllConveyance
          ref={componentRef}
          startDate={startDate}
          endDate={endDate}
          allConveyances={allPrintConveyances}
          totalAmount={totalPrintAmount}
        />
      </Box>
      {/* pop up items */}
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={2.5}>
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
          <Grid item xs={12} md={3.5}>
            <Autocomplete
              loading={employeeLoading}
              value={employee}
              fullWidth
              size="small"
              options={allEmployees}
              getOptionLabel={(option) => option.officeId + ', ' + option.name}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setEmployee(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Employee" />
              )}
            />
          </Grid>
          <Grid item xs={6} md={2}>
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
          <Grid item xs={6} md={2}>
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
          <Grid item xs={12} md={2}>
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
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 850 }}>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center" rowSpan={2}>
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2}>
                Date
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder rowSpan={2}>
                Employee
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="center" colSpan={3}>
                Conveyance Details
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right" rowSpan={2}>
                Total Amount
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
              <StyledTableCellWithBorder align="right">
                Amount
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allConveyances?.length ? (
              allConveyances?.map((el, index) => (
                <AllConveyanceRow key={index} sn={sn++} data={el} />
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
            {allConveyances?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={6}
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
      </Box>

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

export default AllConveyances;
