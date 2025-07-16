import { Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconCheckbox, IconLayoutDashboard } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import ViewMySalary from './ViewMySalary';
import { useReceiveSalaryMutation } from 'store/api/monthSalaryDetail/monthSalaryDetailApi';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

const MySalaryRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [receiveSalary] = useReceiveSalaryMutation();
  const handleReceive = async () => {
    setDialog(false);
    try {
      const res = await receiveSalary(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Salary Received Successfully',
          })
        );
      }
    } catch (err) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
          errorMessages: err?.data?.errorMessages,
        })
      );
    }
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.createdAt).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell>{data?.monthSalary?.year}</StyledTableCell>
      <StyledTableCell>{data?.monthSalary?.month}</StyledTableCell>
      <StyledTableCell align="right">{data?.totalDays}</StyledTableCell>
      <StyledTableCell align="right">{data?.weekends}</StyledTableCell>
      <StyledTableCell align="right">
        {data?.presents - data?.leaves}
      </StyledTableCell>
      <StyledTableCell align="right">{data?.absents}</StyledTableCell>
      <StyledTableCell align="right">{data?.leaves}</StyledTableCell>
      <StyledTableCell align="right">{data?.lateCounts}</StyledTableCell>
      <StyledTableCell align="right">{data?.salary}</StyledTableCell>
      <StyledTableCell align="right">{data?.deduction}</StyledTableCell>
      <StyledTableCell align="right">{data?.earnSalary}</StyledTableCell>
      <StyledTableCell align="center">
        <Button
          variant="contained"
          sx={{ minWidth: 0 }}
          color="secondary"
          size="small"
          onClick={() => setOpen(true)}
        >
          <IconLayoutDashboard size={14} />
        </Button>
        <ViewMySalary
          open={open}
          handleClose={() => setOpen(false)}
          data={data}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="Receive">
          <span>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 0 }}
              onClick={() => setDialog(true)}
              disabled={data.isAccepted}
            >
              <IconCheckbox size={14} />
            </Button>
          </span>
        </Tooltip>
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Receive Salary"
          handleDelete={handleReceive}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default MySalaryRow;
