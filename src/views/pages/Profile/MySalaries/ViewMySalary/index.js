import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { IconPrinter } from '@tabler/icons-react';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintPaySlipRow from 'views/pages/SalaryManagement/PaySalary/ViewPaySalary/PrintPaySlip/PrintPaySlipRow';

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

const ViewMySalary = ({ open, handleClose, data }) => {
  // handle print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
             @media print {
            //    .row {
            //      page-break-inside: avoid;
            //    }
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
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            mb: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<IconPrinter size={14} />}
            size="small"
            color="secondary"
            sx={{ fontSize: 11 }}
            onClick={handlePrint}
          >
            Pay Slip
          </Button>
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 800 }}>
            <Box component="div" ref={componentRef}>
              <PrintPaySlipRow
                year={data?.monthSalary?.year}
                month={data?.monthSalary?.month}
                data={data}
              />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ViewMySalary;
