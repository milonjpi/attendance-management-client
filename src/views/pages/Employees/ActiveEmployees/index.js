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
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import AddEmployee from './AddEmployee';
import ActiveEmployeeRow from './ActiveEmployeeRow';
import { useDebounced } from 'hooks';
import { useGetEmployeesQuery } from 'store/api/employee/employeeApi';
import { useGetDesignationsQuery } from 'store/api/designation/designationApi';
import { useGetDepartmentsQuery } from 'store/api/department/departmentApi';
import { useGetLocationsQuery } from 'store/api/location/locationApi';

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

const ActiveEmployees = () => {
  const [searchText, setSearchText] = useState('');
  const [designation, setDesignation] = useState(null);
  const [department, setDepartment] = useState(null);
  const [location, setLocation] = useState(null);

  const [open, setOpen] = useState(false);

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

  if (designation) {
    query['designationId'] = designation.id;
  }

  if (department) {
    query['departmentId'] = department.id;
  }

  if (location) {
    query['locationId'] = location.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetEmployeesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const employees = data?.employees || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Active Employees"
      secondary={
        <CardAction
          title="Add Employee"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} sm={6} md={3.6}>
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
          <Grid item xs={12} sm={6} md={2.8}>
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
          <Grid item xs={12} sm={6} md={2.8}>
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
      {/* popup items */}

      <AddEmployee open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 400 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Employee ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Office ID</StyledTableCell>
              <StyledTableCell>Designation</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Contact No</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {employees?.length ? (
              employees.map((item) => (
                <ActiveEmployeeRow key={item.id} sn={sn++} data={item} />
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

export default ActiveEmployees;
