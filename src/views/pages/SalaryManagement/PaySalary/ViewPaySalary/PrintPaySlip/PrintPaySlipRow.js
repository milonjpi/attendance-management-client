import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableRow } from '@mui/material';
import { StyledTableCellWithNarrowBorder } from 'ui-component/table-component';
import { ToWords } from 'to-words';
import { salaryDistribution } from 'views/utilities/NeedyFunction';
import printLogo from 'assets/images/print_logo.png';
import PaySlipItem from './PaySlipItem';
import moment from 'moment';
import { BASE_ADDRESS } from 'api/client';

const PrintPaySlipRow = ({ data, year, month }) => {
  const employee = data?.employee;
  const location = employee?.location;
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={printLogo}
                  alt="G"
                  style={{
                    display: 'inline-block',
                    height: 22,
                    paddingRight: 5,
                  }}
                />
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontSize: 19,
                    fontWeight: 700,
                  }}
                >
                  TBZ ENGINEERING
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                {location?.label + ', ' + location?.area?.label}
              </Typography>
              <Typography sx={{ fontSize: 10 }}>{location?.address}</Typography>
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
            <StyledTableCellWithNarrowBorder
              sx={{ width: '50%', verticalAlign: 'top' }}
              colSpan={2}
            >
              <PaySlipItem
                title="Employee Name"
                value={employee?.name}
                sx={{ mb: 0.5 }}
              />
              <PaySlipItem
                title="Designation"
                value={employee?.designation?.label}
                sx={{ mb: 0.5 }}
              />
              <PaySlipItem
                title="Department"
                value={employee?.department?.label}
                sx={{ mb: 0.5 }}
              />
              <PaySlipItem
                title="Joining Date"
                value={moment(employee?.joiningDate).format('DD/MM/YYYY')}
                sx={{ mb: 0.5 }}
              />
              <PaySlipItem
                title="Salary Date"
                value={moment(data?.createdAt).format('DD/MM/YYYY')}
                sx={{ mb: 0.5 }}
              />
              <PaySlipItem
                title="Net Pay"
                value={
                  <span
                    style={{ fontWeight: 700 }}
                  >{`৳ ${data?.earnSalary}`}</span>
                }
              />
            </StyledTableCellWithNarrowBorder>
            <StyledTableCellWithNarrowBorder sx={{ width: '50%' }} colSpan={2}>
              <PaySlipItem
                title="Days of Month"
                value={data?.totalDays}
                sx={{ mb: 0.5 }}
                valueSX={{ textAlign: 'right' }}
              />
              <PaySlipItem
                title="Weekend"
                value={data?.weekends}
                sx={{ mb: 0.5 }}
                valueSX={{ textAlign: 'right' }}
              />
              <PaySlipItem
                title="Present"
                value={data?.presents - data?.leaves}
                sx={{ mb: 0.5 }}
                valueSX={{ textAlign: 'right' }}
              />
              <PaySlipItem
                title="Absent"
                value={data?.absents}
                sx={{ mb: 0.5 }}
                valueSX={{ textAlign: 'right' }}
              />
              <PaySlipItem
                title="Leave"
                value={data?.leaves}
                sx={{ mb: 0.5 }}
                valueSX={{ textAlign: 'right' }}
              />
              <PaySlipItem
                title="Late Count"
                value={data?.lateCounts}
                valueSX={{ textAlign: 'right' }}
              />
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

      {/* <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
          mt: 7,
        }}
      >
        <Box sx={{ width: 200, textAlign: 'center' }}>
          {data?.isAccepted ? (
            employee?.signature ? (
              <img
                src={`${BASE_ADDRESS}/uploads/employees/${employee?.signature}`}
                alt="Emp-Signature"
                style={{
                  display: 'inline-block',
                  width: '100%',
                  height: '45px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <Typography>{employee?.name}</Typography>
            )
          ) : null}
          <Typography
            sx={{
              width: 200,
              fontSize: 10,
              textTransform: 'uppercase',
              textAlign: 'center',
              mx: 5,
              px: 1,
              pt: 0.2,
              borderTop: '1px solid #676767',
            }}
          >
            Employee Signature
          </Typography>
        </Box>
      </Box> */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end', // Use flex-end instead of 'right'
          mt: 6,
        }}
      >
        <Box sx={{ width: 160, textAlign: 'center' }}>
          {data?.isAccepted && (
            <>
              {employee?.signature ? (
                <img
                  src={`${BASE_ADDRESS}/uploads/employees/${employee.signature}`}
                  alt="Employee Signature"
                  style={{
                    width: '100%',
                    height: '45px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <Typography sx={{ fontSize: 9 }}>{employee?.name}</Typography>
              )}
            </>
          )}

          <Typography
            sx={{
              fontSize: 10,
              textTransform: 'uppercase',
              textAlign: 'center',
              mt: 0.5,
              borderTop: '1px solid #676767',
              pt: 0.5,
            }}
          >
            Employee Signature
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PrintPaySlipRow;
