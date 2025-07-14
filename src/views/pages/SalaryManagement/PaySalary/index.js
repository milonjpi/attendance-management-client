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
import { Button, IconButton, TablePagination, Tooltip } from '@mui/material';
import { IconPlus, IconPrinter } from '@tabler/icons-react';
import { monthList, salaryYear } from 'assets/data';
import { useGetEmployeesQuery } from 'store/api/employee/employeeApi';
import CardAction from 'ui-component/cards/CardAction';
import CreatePaySlip from './CreatePaySlip';
import { useGetMonthSalariesQuery } from 'store/api/monthSalary/monthSalaryApi';
import PaySalaryRow from './PaySalaryRow';

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
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [location, setLocation] = useState(null);
  const [employee, setEmployee] = useState(null);

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

  query['isActive'] = true;
  query['isOwn'] = false;
  query['startDate'] = moment(`${year}-${month}`, 'YYYY-MMMM')
    .startOf('month')
    .format('YYYY-MM-DD');

  query['endDate'] =
    moment().format('YYYY-MMMM') === `${year}-${month}`
      ? moment().format('YYYY-MM-DD')
      : moment(`${year}-${month}`, 'YYYY-MMMM')
          .endOf('month')
          .format('YYYY-MM-DD');

  if (location) {
    query['locationId'] = location.id;
  }

  if (employee) {
    query['employeeId'] = employee.officeId;
  }

  const { data, isLoading } = useGetMonthSalariesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allSalaries = data?.monthSalaries || [];
  const meta = data?.meta;

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

  // handle pay slip print
  const payComponentRef = useRef();
  const handlePayslipPrint = useReactToPrint({
    content: () => payComponentRef.current,
    pageStyle: `
           @media print {
            //  .row {
            //    page-break-inside: avoid;
            //  }
           }
           `,
  });

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
              onChange={(e, newValue) => {
                setLocation(newValue);
                setEmployee(null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Branch" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup item */}
      <CreatePaySlip open={open} handleClose={() => setOpen(false)} />
      {/* <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintMonthlySalaries
          ref={componentRef}
          allSalaries={allSalaries}
          month={month}
          year={year}
          branch={location}
          isLoading={isLoading}
        />
      </Box>
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <ViewPaySlip
          ref={payComponentRef}
          data={allSalaries}
          year={year}
          month={month}
        />
      </Box> */}
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
                <PaySalaryRow key={index} sn={index + 1} data={el} />
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
