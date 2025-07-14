import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableRow } from '@mui/material';
import { StyledTableCellWithNarrowBorder } from 'ui-component/table-component';
import { ToWords } from 'to-words';
import { salaryDistribution } from 'views/utilities/NeedyFunction';
import PaySlipItem from './PaySlipItem';

const PrintPaySlipRow = ({ data, year, month }) => {
  const salaryDist = salaryDistribution(data?.salary || 0);
  // convert to word
  const toWords = new ToWords({
    localeCode: 'en-BD',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    },
  });

  const words = toWords.convert(data?.earnSalary || 0);
  return (
    <Box>
      <Table sx={{ textTransform: 'uppercase' }}>
        <TableBody>
          <TableRow>
            <StyledTableCellWithNarrowBorder align="center" colSpan={4}>
              <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
                {data?.branch}
              </Typography>
              <Typography sx={{ fontSize: 10 }}>{data?.address}</Typography>
            </StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder
              align="center"
              colSpan={4}
              sx={{ fontSize: 10 }}
            >
              Payslip for the Month of {month}, {year}
            </StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder sx={{ width: '50%' }} colSpan={2}>
              <PaySlipItem
                title="Employee Name"
                value={data?.fullName}
                sx={{ mb: 0.5 }}
              />
              <PaySlipItem
                title="Designation"
                value={data?.designation}
                sx={{ mb: 0.5 }}
              />
              <PaySlipItem
                title="Department"
                value={data?.department}
                sx={{ mb: 0.5 }}
              />
              <PaySlipItem title="Joining Date" value={data?.joiningDate} />
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder
              sx={{ width: '50%' }}
              colSpan={2}
              align="center"
            >
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                Employee Net Pay
              </Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                {'৳ ' + data?.earnSalary}
              </Typography>
              <Typography sx={{ fontSize: 11 }}>
                {'Paid Days: ' +
                  data?.workingDay +
                  ' | LOP Days: ' +
                  data?.absent}
              </Typography>
            </StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder sx={{ fontWeight: 700 }}>
              EARNINGS
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder
              sx={{ fontWeight: 700 }}
              align="right"
            >
              Amount
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder sx={{ fontWeight: 700 }}>
              Deductions
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder
              sx={{ fontWeight: 700 }}
              align="right"
            >
              Amount
            </StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder>
              Basic
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right">
              {salaryDist?.basic}
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder>
              Abs. Deduction
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right">
              {data?.deduction}
            </StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder>
              House Rent
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right">
              {salaryDist?.rent}
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder></StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right"></StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder>
              Medical
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right">
              {salaryDist?.medical}
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder></StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right"></StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder>
              Conveyance
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right">
              {salaryDist?.conveyance}
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder></StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right"></StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder>
              Food Allowance
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right">
              {salaryDist?.food}
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder></StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder align="right"></StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder sx={{ fontWeight: 700 }}>
              Grand Total
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder
              sx={{ fontWeight: 700 }}
              align="right"
            >
              {data?.salary}
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder sx={{ fontWeight: 700 }}>
              Total Deduction
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder
              sx={{ fontWeight: 700 }}
              align="right"
            >
              {data?.deduction}
            </StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder
              sx={{ fontSize: '11px !important', fontWeight: 700 }}
              colSpan={2}
            >
              Net Pay
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder
              sx={{ fontSize: '11px !important', fontWeight: 700 }}
              align="right"
              colSpan={2}
            >
              {data?.earnSalary}
            </StyledTableCellWithNarrowBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithNarrowBorder
              sx={{ fontWeight: 700 }}
              align="center"
              colSpan={4}
            >
              {'Total Net Payable ৳ ' + data?.earnSalary + ` (${words})`}
            </StyledTableCellWithNarrowBorder>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default PrintPaySlipRow;
