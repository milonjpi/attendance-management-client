import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import { useGetExpenseSummaryMonthQuery } from 'store/api/report/reportApi';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { useState } from 'react';
import { salaryYear } from 'assets/data';
import { IconPrinter } from '@tabler/icons-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import MonthSummaryRow from './MonthSummaryRow';
import moment from 'moment';
import PrintMonthSummary from './PrintMonthSummary';

const MonthSummary = () => {
  const userData = useSelector(selectAuth);
  // employee data
  const { data: userEmpData } = useGetSingleUserEmployeeQuery(
    userData.userName || '123',
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
    }
  );
  const employeeData = userEmpData?.data;

  const [year, setYear] = useState(moment().format('YYYY'));

  // filtering and pagination
  const query = {};

  query['year'] = year;
  query['locationId'] = employeeData?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  const { data, isLoading } = useGetExpenseSummaryMonthQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];

  // handle print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
                  @media print {
                    .row{
                      page-break-inside: avoid;
                    }
                  }
                  `,
  });
  // end handle print
  return (
    <MainCard
      title="Monthly Expense Summary"
      secondary={
        <Tooltip title="Print">
          <IconButton size="small" color="primary" onClick={handlePrint}>
            <IconPrinter size={18} />
          </IconButton>
        </Tooltip>
      }
    >
      {/* print area */}
      <Box sx={{ height: 0, overflow: 'hidden' }}>
        <PrintMonthSummary
          allExpenses={allExpenses}
          year={year}
          isLoading={isLoading}
          ref={componentRef}
        />
      </Box>

      {/* end print area */}
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={2.5}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-year-id">Select Year</InputLabel>
              <Select
                labelId="select-year-id"
                value={year}
                label="Select Year"
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
        </Grid>
      </Box>
      {/* end filter area */}
      {/* data table */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Month</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Branch</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Salary
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Conveyance
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Bill
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Total Expenses
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Month Expenses
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allExpenses?.length ? (
              allExpenses?.map((el, index) => (
                <MonthSummaryRow key={index} sn={index + 1} data={el} />
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
          </TableBody>
        </Table>
      </Box>

      {/* end data table */}
    </MainCard>
  );
};

export default MonthSummary;
