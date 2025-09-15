import MainCard from 'ui-component/cards/MainCard';
import { useState } from 'react';
import { useGetExpenseSummaryQuery } from 'store/api/report/reportApi';
import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { Empty, StyledTableCellWithBorder } from 'ui-component/table-component';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconPrinter } from '@tabler/icons-react';
import { totalSum } from 'views/utilities/NeedyFunction';
import { monthList, salaryYear } from 'assets/data';
import ExpenseSummaryRow from './ExpenseSummaryRow';
import PrintExpenseSummary from './PrintExpenseSummary';
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';

const ExpenseSummary = () => {
  const userData = useSelector(selectAuth);
  // employee data
  const { data: userEmpData, isLoading: employeeLoading } =
    useGetSingleUserEmployeeQuery(userData.userName || '123', {
      refetchOnMountOrArgChange: true,
      pollingInterval: 10000,
    });
  const employeeData = userEmpData?.data;

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  // filtering and pagination
  const query = {};
  query['locationId'] = employeeData?.locationId;

  if (userData?.role === 'super_admin') {
    delete query.locationId;
  }

  if (year) {
    query['year'] = year;
  }

  if (month) {
    query['month'] = month;
  }

  const { data, isLoading } = useGetExpenseSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allExpenses = data?.data || [];

  // calculation
  const totalSalaries = totalSum(allExpenses, 'salaries');
  const totalConveyances = totalSum(allExpenses, 'conveyances');
  const totalBills = totalSum(allExpenses, 'bills');
  const totalExpenses = totalSum(allExpenses, 'totalExpenses');

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
      title="Expense Summary"
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
        <PrintExpenseSummary
          allExpenses={allExpenses}
          year={year}
          month={month}
          totalSalaries={totalSalaries}
          totalConveyances={totalConveyances}
          totalBills={totalBills}
          totalExpenses={totalExpenses}
          isLoading={isLoading || employeeLoading}
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
            <Autocomplete
              value={year}
              size="small"
              fullWidth
              options={salaryYear}
              onChange={(e, newValue) => {
                setYear(newValue);
                setMonth(null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Year" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={month}
              disabled={year ? false : true}
              size="small"
              fullWidth
              options={monthList}
              onChange={(e, newValue) => setMonth(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Month" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}
      {/* data table */}
      <Table>
        <TableHead>
          <TableRow className="row">
            <StyledTableCellWithBorder align="center">
              SN
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>BRANCH</StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              SALARIES
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              CONVEYANCES
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              BILLS
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              TOTAL EXPENSES
            </StyledTableCellWithBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          {allExpenses?.length ? (
            allExpenses?.map((el, index) => (
              <ExpenseSummaryRow key={index} sn={index + 1} data={el} />
            ))
          ) : (
            <TableRow className="row">
              <StyledTableCellWithBorder colSpan={15}>
                {isLoading || employeeLoading ? (
                  <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                ) : (
                  <Empty />
                )}
              </StyledTableCellWithBorder>
            </TableRow>
          )}
          {allExpenses?.length ? (
            <TableRow>
              <StyledTableCellWithBorder colSpan={2} sx={{ fontWeight: 700 }}>
                TOTAL
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right" sx={{ fontWeight: 700 }}>
                {totalSalaries}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right" sx={{ fontWeight: 700 }}>
                {totalConveyances}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right" sx={{ fontWeight: 700 }}>
                {totalBills}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right" sx={{ fontWeight: 700 }}>
                {totalExpenses}
              </StyledTableCellWithBorder>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>

      {/* end data table */}
    </MainCard>
  );
};

export default ExpenseSummary;
