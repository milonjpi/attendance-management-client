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
import { useGetSalaryReportQuery } from 'store/api/report/reportApi';

import moment from 'moment';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconButton, Tooltip } from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';
import { monthList, salaryYear } from 'assets/data';
import MonthlySalaryRow from './MonthlySalaryRow';
import PrintMonthlySalaries from './PrintMonthlySalaries';
import { useGetEmployeesQuery } from 'store/api/employee/employeeApi';

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

const MonthlySalaries = () => {
  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [location, setLocation] = useState(null);
  const [employee, setEmployee] = useState(null);

  // library
  const { data: locationData, isLoading: locationLoading } =
    useGetLocationsQuery(
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
  if (location) {
    empQuery['locationId'] = location?.id;
  }
  const { data: employeeData } = useGetEmployeesQuery({ ...empQuery });
  const employees = employeeData?.employees || [];
  // end library

  // filtering and pagination
  const query = {};

  query['isActive'] = true;
  query['isOwn'] = false;
  query['startDate'] = moment(`${year}-${month}`, 'YYYY-MMMM')
    .startOf('month')
    .format('YYYY-MM-DD');

  query['endDate'] = moment(`${year}-${month}`, 'YYYY-MMMM')
    .endOf('month')
    .format('YYYY-MM-DD');

  if (location) {
    query['locationId'] = location.id;
  }

  if (employee) {
    query['employeeId'] = employee.officeId;
  }

  const { data, isLoading } = useGetSalaryReportQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allSalaries = data?.data || [];

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
  console.log(moment('2025-02-05').endOf('month').format('YYYY-MM-DD'));
  return (
    <MainCard
      title="Month Salary"
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
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-year-id">Year</InputLabel>
              <Select
                labelId="select-year-id"
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
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
                {monthList?.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3.5}>
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
              onChange={(e, newValue) => {
                setLocation(newValue);
                setEmployee(null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Branch" />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
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
      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintMonthlySalaries
          ref={componentRef}
          allSalaries={allSalaries}
          month={month}
          year={year}
          branch={location}
          isLoading={isLoading}
        />
      </Box>
      {/* end popup item */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 950 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Employee</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Branch</StyledTableCell>
              <StyledTableCell align="right">Total Day</StyledTableCell>
              <StyledTableCell align="right">Weekend</StyledTableCell>
              <StyledTableCell align="right">Working Day</StyledTableCell>
              <StyledTableCell align="right">Presents</StyledTableCell>
              <StyledTableCell align="right">Leaves</StyledTableCell>
              <StyledTableCell align="right">Absent</StyledTableCell>
              <StyledTableCell align="right">
                Salary &#40;TK&#41;
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allSalaries?.length ? (
              allSalaries?.map((el, index) => (
                <MonthlySalaryRow key={index} sn={index + 1} data={el} />
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

export default MonthlySalaries;
