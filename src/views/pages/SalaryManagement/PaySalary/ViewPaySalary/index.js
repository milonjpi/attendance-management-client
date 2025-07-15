import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import printLogo from 'assets/images/print_logo.png';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import { useCreateAttendanceMutation } from 'store/api/attendance/attendanceApi';
import { useGetEmployeesQuery } from 'store/api/employee/employeeApi';
import { useGetLocationsQuery } from 'store/api/location/locationApi';
import ViewPaySalaryRow from './ViewPaySalaryRow';
import { Button } from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintPaySlip from './PrintPaySlip';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 850 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 3,
};

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

const ViewPaySalary = ({ open, handleClose, data }) => {
  const monthSalaryDetails = data?.monthSalaryDetails || [];
  const location = data?.location;

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
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#878781' }}>
            View Pay Slip
          </Typography>
          <IconButton
            color="error"
            sx={{ width: 25, height: 25 }}
            onClick={handleClose}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        {/* popup item */}
        <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
          <PrintPaySlip ref={payComponentRef} data={data} />
        </Box>
        {/* end popup item */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<IconPrinter size={14} />}
            size="small"
            color="primary"
            sx={{ fontSize: 11 }}
            onClick={handlePrint}
          >
            Sheet
          </Button>
          <Button
            variant="outlined"
            startIcon={<IconPrinter size={14} />}
            size="small"
            color="secondary"
            sx={{ fontSize: 11 }}
            onClick={handlePayslipPrint}
          >
            Pay Slip
          </Button>
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 800 }}>
            <Box ref={componentRef}>
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
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  TBZ ENGINEERING
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                {location?.label + ', ' + location?.area?.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  fontWeight: 700,
                  py: 1.5,
                }}
              >
                Salary Sheet
              </Typography>
              <Table>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">SN</StyledTableCell>
                    <StyledTableCell>Employee</StyledTableCell>
                    <StyledTableCell>Department</StyledTableCell>
                    <StyledTableCell align="right">Total Days</StyledTableCell>
                    <StyledTableCell align="right">
                      Working Days
                    </StyledTableCell>
                    <StyledTableCell align="right">Absents</StyledTableCell>
                    <StyledTableCell align="right">
                      Salary &#40;TK&#41;
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Deduction &#40;TK&#41;
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Payable &#40;TK&#41;
                    </StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {monthSalaryDetails?.length ? (
                    monthSalaryDetails?.map((el, index) => (
                      <ViewPaySalaryRow key={index} sn={index + 1} data={el} />
                    ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell
                        colSpan={18}
                        sx={{ border: 0 }}
                        align="center"
                      >
                        No Data
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ViewPaySalary;
