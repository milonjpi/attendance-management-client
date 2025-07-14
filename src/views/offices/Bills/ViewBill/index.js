import React, { useRef } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import printLogo from 'assets/images/print_logo.png';
import { useReactToPrint } from 'react-to-print';
import DataTable from 'ui-component/table';
import { TableRow } from '@mui/material';
import { StyledTableCellWithNarrowBorder } from 'ui-component/table-component';
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
  let tableHeads = [
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
      title: 'SUPPLIER',
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

  if (data?.isService) {
    tableHeads = tableHeads.filter(
      (el) => !['UOM', 'QUANTITY'].includes(el.title)
    );
  }

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
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    mb: 0.8,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 0.5,
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
                      fontSize: 11,
                      textAlign: 'center',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                    }}
                  >
                    {data?.location?.label + ', ' + data?.location?.area?.label}
                  </Typography>
                </Box>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  Bill
                </Typography>
                {data?.isService ? null : (
                  <Typography
                    sx={{
                      fontSize: 10,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  >
                    &#40;
                    {employee?.name +
                      ', ' +
                      employee?.designation?.label +
                      ', ' +
                      employee?.department?.label}
                    &#41;
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 0.5,
                }}
              >
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    fontSize: 12,
                  }}
                >
                  Bill Details
                </Typography>
                <Typography
                  sx={{
                    fontSize: 9,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  &#40;This bill is for internal use only&#41;
                </Typography>
                <Typography sx={{ fontSize: 10 }}>
                  <span sx={{ fontWeight: 500 }}>DATE: </span>
                  {moment(data?.date).format('DD/MM/YYYY')}
                </Typography>
              </Box>

              <DataTable
                bordered
                headSX={{
                  fontSize: '10px !important',
                  padding: '2px 6px !important',
                }}
                tableHeads={tableHeads}
                data={data?.billDetails || []}
                options={(el, index) => (
                  <ViewBillRow
                    key={el.id}
                    sn={index + 1}
                    data={el}
                    isService={data?.isService}
                  />
                )}
                extra={
                  <TableRow>
                    <StyledTableCellWithNarrowBorder
                      colSpan={data?.isService ? 4 : 6}
                      sx={{ fontSize: '11px !important', fontWeight: 700 }}
                    >
                      TOTAL
                    </StyledTableCellWithNarrowBorder>
                    <StyledTableCellWithNarrowBorder
                      sx={{ fontSize: '11px !important', fontWeight: 700 }}
                      align="right"
                    >
                      {data?.amount}
                    </StyledTableCellWithNarrowBorder>
                  </TableRow>
                }
              />
              {data?.remarks ? (
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    fontSize: 8,
                    mt: 0.5,
                  }}
                >
                  Remarks:{' '}
                  <span style={{ fontWeight: 300 }}>{data?.remarks}</span>
                </Typography>
              ) : null}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'right',
                  mt: 5,
                }}
              >
                <Typography
                  sx={{
                    width: 100,
                    fontSize: 10,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    mx: 5,
                    px: 1,
                    pt: 0.2,
                    borderTop: '1px solid #676767',
                  }}
                >
                  Approved By
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ViewBill;
