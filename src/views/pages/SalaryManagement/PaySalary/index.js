import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGetLocationsQuery } from 'store/api/location/locationApi';
import { TablePagination } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { monthList, salaryYear } from 'assets/data';
import CardAction from 'ui-component/cards/CardAction';
import CreatePaySlip from './CreatePaySlip';
import { useGetMonthSalariesQuery } from 'store/api/monthSalary/monthSalaryApi';
import PaySalaryRow from './PaySalaryRow';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';

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

const PaySalary = () => {
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

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [location, setLocation] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: locationData, isLoading: locationLoading } =
    useGetLocationsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const allLocations = locationData?.locations || [];
  // end library

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
  query['locationId'] = userEmployee?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  if (year) {
    query['year'] = year;
  }
  if (month) {
    query['month'] = month;
  }

  if (location) {
    query['locationId'] = location.id;
  }

  const { data, isLoading } = useGetMonthSalariesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allSalaries = data?.monthSalaries || [];
  const meta = data?.meta;

  return (
    <MainCard
      title={<span>Pay Salary</span>}
      secondary={
        <CardAction
          icon={<IconPlus />}
          title="Create Pay Slip"
          onClick={() => setOpen(true)}
        />
      }
    >
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
              <InputLabel id="select-month-id">Month</InputLabel>
              <Select
                labelId="select-month-id"
                value={month}
                label="Month"
                onChange={(e) => setMonth(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {monthList?.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {userData?.role === 'super_admin' ? (
            <Grid item xs={12} md={4}>
              <Autocomplete
                loading={locationLoading}
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
      <CreatePaySlip
        open={open}
        handleClose={() => setOpen(false)}
        userData={userData}
        userEmployee={userEmployee}
      />
      {/* end popup item */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Year</StyledTableCell>
              <StyledTableCell>Month</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell align="right">
                Total Salary &#40;TK&#41;
              </StyledTableCell>
              <StyledTableCell align="center">View</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allSalaries?.length ? (
              allSalaries?.map((el, index) => (
                <PaySalaryRow
                  key={index}
                  sn={index + 1}
                  data={el}
                  userData={userData}
                  userEmployee={userEmployee}
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

export default PaySalary;
