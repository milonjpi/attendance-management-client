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
import { useGetSingleUserEmployeeQuery } from 'store/api/employee/employeeApi';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import PrintBranchWiseSummary from './PrintBranchWiseSummary';
import BranchWiseSummaryRow from './BranchWiseSummaryRow';

const BranchWiseSummary = () => {
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
  const totalConveyances = totalSum(allExpenses, 'conveyances');

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
      title="Branch Conveyance Summary"
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
        <PrintBranchWiseSummary
          allExpenses={allExpenses}
          year={year}
          month={month}
          totalConveyances={totalConveyances}
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
              CONVEYANCES AMOUNT
            </StyledTableCellWithBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          {allExpenses?.length ? (
            allExpenses?.map((el, index) => (
              <BranchWiseSummaryRow key={index} sn={index + 1} data={el} />
            ))
          ) : (
            <TableRow className="row">
              <StyledTableCellWithBorder colSpan={15}>
                {isLoading || employeeLoading ? (
                  <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <Empty />
                  </Box>
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
                {totalConveyances}
              </StyledTableCellWithBorder>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>

      {/* end data table */}
    </MainCard>
  );
};

export default BranchWiseSummary;
