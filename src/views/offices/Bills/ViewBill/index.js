import React, { useRef } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import DataTable from 'ui-component/table';
import { Table, TableBody, TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import ShowStatus from 'ui-component/ShowStatus';
import ViewBillRow from './ViewBillRow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 850 },
  maxHeight: 'calc(100vh - 20px)',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const ViewBill = ({ open, handleClose, data }) => {
  const employee = data?.employee;
  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'ITEM',
    },
    {
      title: 'DETAILS',
    },
    {
      title: 'SHOP',
    },
    {
      title: 'UOM',
      align: 'center',
    },
    {
      title: 'QUANTITY',
      align: 'right',
    },
    {
      title: 'AMOUNT (TK)',
      align: 'right',
    },
  ];

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
            Bill View{' '}
            <Button size="small" onClick={handlePrint}>
              Print
            </Button>
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 800 }}>
            <Box ref={componentRef}>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    mb: 0.8,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 25,
                      textAlign: 'center',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    TBZ Engineering
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      textAlign: 'center',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}
                  >
                    {employee?.location?.label +
                      ', ' +
                      employee?.location?.area?.label}
                  </Typography>
                </Box>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: 18,
                    textAlign: 'center',
                    fontWeight: 700,
                    mt: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  Bill
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellWithBorder sx={{ width: 100 }}>
                          OFFICE ID
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder>
                          {employee?.officeId}
                        </StyledTableCellWithBorder>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellWithBorder sx={{ width: 100 }}>
                          NAME
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder>
                          {employee?.name}
                        </StyledTableCellWithBorder>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellWithBorder sx={{ width: 100 }}>
                          DESIGNATION
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder>
                          {employee?.designation?.label}
                        </StyledTableCellWithBorder>
                      </TableRow>
                      <TableRow>
                        <StyledTableCellWithBorder sx={{ width: 100 }}>
                          DEPARTMENT
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder>
                          {employee?.department?.label}
                        </StyledTableCellWithBorder>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={7}>
                  <Typography
                    sx={{ textAlign: 'right', fontSize: 12, mb: 0.5 }}
                  >
                    <span sx={{ fontWeight: 500 }}>DATE: </span>
                    {moment(data?.date).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography sx={{ textAlign: 'right', fontSize: 11 }}>
                    <span sx={{ fontWeight: 500 }}>STATUS: </span>
                    <ShowStatus status={data?.status} />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      fontSize: 12,
                      mb: 0.5,
                    }}
                  >
                    Bill Details
                  </Typography>
                  <DataTable
                    bordered
                    tableHeads={tableHeads}
                    data={data?.billDetails || []}
                    options={(el, index) => (
                      <ViewBillRow key={el.id} sn={index + 1} data={el} />
                    )}
                    extra={
                      data?.remarks ? (
                        <TableRow>
                          <StyledTableCellWithBorder
                            colSpan={7}
                            sx={{ fontSize: '10px !important' }}
                            align="center"
                          >
                            <span style={{ fontWeight: 500 }}>Remarks: </span>
                            {data?.remarks}
                          </StyledTableCellWithBorder>
                        </TableRow>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Table sx={{ mt: 1.5 }}>
                    <TableBody>
                      <TableRow>
                        <StyledTableCellWithBorder
                          sx={{ width: '50%', fontWeight: 700, fontSize: 12 }}
                        >
                          TOTAL
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder
                          sx={{
                            width: '50%',
                            fontWeight: 700,
                            fontSize: 12,
                            textAlign: 'right',
                          }}
                        >
                          {data?.amount}
                        </StyledTableCellWithBorder>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ViewBill;
