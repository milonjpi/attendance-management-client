import { Button, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { IconLayoutDashboard, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteMonthSalaryMutation } from 'store/api/monthSalary/monthSalaryApi';
import { setToast } from 'store/toastSlice';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import { totalSum } from 'views/utilities/NeedyFunction';
import ViewPaySalary from './ViewPaySalary';

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

const PaySalaryRow = ({ sn, data }) => {
  const monthSalaryDetails = data?.monthSalaryDetails || [];
  const totalSalary = totalSum(monthSalaryDetails, 'earnSalary');
  const findAcceptance = monthSalaryDetails?.find((el) => el.isAccepted);

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();

  const [deleteMonthSalary] = useDeleteMonthSalaryMutation();
  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteMonthSalary(data?.id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: 'Pay Slip Deleted Successfully',
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
      <StyledTableCell>{data?.year}</StyledTableCell>
      <StyledTableCell>{data?.month}</StyledTableCell>
      <StyledTableCell>
        {data?.location?.label + ', ' + data?.location?.area?.label}
      </StyledTableCell>
      <StyledTableCell align="right">{totalSalary}</StyledTableCell>
      <StyledTableCell align="center">
        <Button
          variant="contained"
          sx={{ minWidth: 0 }}
          color="primary"
          size="small"
          onClick={() => setOpen(true)}
        >
          <IconLayoutDashboard size={14} />
        </Button>
        <ViewPaySalary
          open={open}
          handleClose={() => setOpen(false)}
          data={data}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Tooltip title="Delete">
          <span>
            <Button
              variant="contained"
              sx={{ minWidth: 0 }}
              color="error"
              size="small"
              onClick={() => setDialog(true)}
              disabled={findAcceptance ? true : false}
            >
              <IconTrashXFilled size={14} />
            </Button>
          </span>
        </Tooltip>
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Pay Slip"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PaySalaryRow;
